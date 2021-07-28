const User = require('../models/User')
const Image = require('../models/Image')
const asyncHandler = require('../middleware/asyncHandler')
const getValidationResult = require('../utils/getValidationResult')
const sendEmail = require('../utils/sendEmail')
const createToken = require('../utils/createToken')
const emailConfirmationTemplate = require('../utils/emailConfirmationTemplate')
const passwordResetTemplate = require('../utils/passwordResetTemplate')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/errorResponse')

const getAuthorizedImages = require('../utils/getAuthorizedImages')

// Helper only for development
// @desc      Delete all users
// @route     DELETE /api/auth/users
// @access    While developing

exports.deleteAllUsers = asyncHandler(async (req, res, next) => {
    const deletedUsers = await User.deleteMany({})
    res.json({ message: 'users deleted success', deletedUsers })
})

// @desc      Register user
// @route     POST /api/auth/signup
// @access    Public
exports.signupController = asyncHandler(async (req, res, next) => {
    const { hasError, errors } = getValidationResult({ req })

    if (hasError) {
        throw new ErrorResponse({
            message: 'Registration validation failed',
            error: errors,
        })
    }

    const { name, email, password } = req.body

    const userIsExist = await User.findUserByEmail(email)

    if (userIsExist) {
        throw new ErrorResponse({
            message: 'Email has already been registered',
        })
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
    })

    // grab token and send to email
    const confirmEmailToken = user.generateEmailConfirmToken()

    user.save({ validateBeforeSave: false })

    const sendResult = await sendEmail({
        email: user.email,
        subject: 'Email confirmation token',
        html: emailConfirmationTemplate({ req, confirmEmailToken }),
    })

    sendSuccessResponse({
        code: 201,
        res,
        message: ` You have just registered successfully and we have sent an email verification message to ${email} check your inbox to verify `,
    })
})

// @desc    Confirm Email
// @route   GET /api/auth/confirmemail
// @access  Public
exports.confirmEmail = asyncHandler(async (req, res, next) => {
    // grab token from email
    const { token } = req.query

    if (!token) {
        throw new ErrorResponse({ message: 'Invalid Token' })
    }

    const splitToken = token.split('.')[0]

    const confirmEmailToken = createToken({ token: splitToken })

    // get user by token
    const user = await User.findOne({
        confirmEmailToken,
        isEmailConfirmed: false,
    })

    if (!user) {
        throw new ErrorResponse({ message: 'Invalid Token' })
    }

    // update confirmed to true
    user.confirmEmailToken = undefined
    user.isEmailConfirmed = true

    user.save({ validateBeforeSave: false })

    sendSuccessResponse({
        res,
        message: 'Thank you for verifying your email now you can login and ',
    })
})

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.loginController = asyncHandler(async (req, res, next) => {
    const { hasError, errors } = getValidationResult({ req })
    if (hasError) {
        throw new ErrorResponse({
            message: 'Invalid Email or Password',
        })
    }

    const { email, password } = req.body

    const foundUser = await User.findOne({ email }).select('+password')

    if (!foundUser) {
        throw new ErrorResponse({
            message: 'Invalid Email or Password',
        })
    }

    if (!foundUser.isEmailConfirmed) {
        const confirmEmailToken = foundUser.generateEmailConfirmToken()

        foundUser.save({ validateBeforeSave: false })

        const sendResult = await sendEmail({
            email: foundUser.email,
            subject: 'Email confirmation token',
            html: emailConfirmationTemplate({
                req,
                confirmEmailToken,
            }),
        })

        throw new ErrorResponse({
            message: ` You can't login before verifying your email ${email} address check your inbox to verify `,
        })
    }

    const isPasswordMatch = await foundUser.matchPassword(password)

    if (!isPasswordMatch) {
        throw new ErrorResponse({
            message: 'Invalid Email or Password',
        })
    }

    const token = foundUser.getSignedJwtToken()

    sendSuccessResponse({
        res,
        message: 'Login successful',
        data: { token: `Bearer ${token}` },
    })
})

// @desc      Get current logged in user
// @route     GET /api/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
    // user is already available in req due to the protect middleware
    const user = req.user

    const authorizedImages = await getAuthorizedImages(req)

    const images = await Image.find({
        _id: {
            $in: authorizedImages,
        },
    }).select('-mainImage -path')

    sendSuccessResponse({
        res,
        data: { user, images },
    })
})

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
exports.updateUserProfileController = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('password')

    if (!req.body.password) {
        delete req.body.password
    }

    const { hasError, errors } = getValidationResult({ req })

    if (hasError) {
        throw new ErrorResponse({
            message: 'Registration validation failed',
            error: errors,
        })
    }

    const { password, name, confirmPassword } = req.body

    if (!user) {
        throw new ErrorResponse({
            code: 403,
            message: 'Forbidden!',
        })
    }

    user.name = name

    if (password) {
        const isMatch = await user.matchPassword(confirmPassword)

        if (!isMatch) {
            throw new ErrorResponse({
                code: 401,
                message: 'Unauthorized!',
            })
        }

        user.password = password
    }

    const updatedUser = await user.save()

    return sendSuccessResponse({
        res,
        message: 'User Update successful',
        data: { name: updatedUser.name },
    })
})

// @desc      Forgot password
// @route     POST /api/auth/forgotpassword
// @access    Public
exports.forgotPasswordController = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select(
        '+password'
    )

    if (!user) {
        throw new ErrorResponse({
            message: 'There is no user with that email',
            code: 404,
        })
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    try {
        const sendResult = await sendEmail({
            email: user.email,
            subject: 'Password Reset',
            html: passwordResetTemplate(resetToken),
        })

        sendSuccessResponse({
            res,
            message: `You have got an password reset email to ${user.email} please check your inbox`,
        })
    } catch (err) {
        console.log(err)
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        throw new ErrorResponse({
            message: 'Email could not be sent',
            code: 500,
        })
    }
})

// @desc      Reset password
// @route     PUT /api/auth/resetpassword/:resettoken
// @access    Public
exports.resetPasswordController = asyncHandler(async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = createToken({ token: req.params.resettoken })

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
        throw new ErrorResponse({ message: 'Invalid token' })
    }

    // Set new password
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    const token = user.getSignedJwtToken()

    sendSuccessResponse({
        res,
        message: 'Login successful',
        data: { token: `Bearer ${token}` },
    })
})
