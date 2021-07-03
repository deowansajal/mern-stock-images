const User = require('../models/User')
const asyncHandler = require('../middleware/asyncHandler')
const getValidationResult = require('../utils/getValidationResult')
const sendEmail = require('../utils/sendEmail')
const createToken = require('../utils/createToken')
const emailConfirmationTemplate = require('../utils/emailConfirmationTemplate')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const SendErrorResponse = require('../utils/SendErrorResponse')

// Helper only for development
// @desc      Delete all users
// @route     DELETE /api/auth/users
// @access    While developing

exports.deleteAllUsers = asyncHandler(async (req, res, next) => {
    const deletedUsers = await User.deleteMany({})
    res.json({ message: 'users deleted success', deletedUsers })
})

// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
exports.registerController = asyncHandler(async (req, res, next) => {
    const { hasError, errors } = getValidationResult(req)

    if (hasError) {
        throw new SendErrorResponse({
            message: 'Registration validation failed',
            data: errors,
        })
    }

    const { name, email, password, role } = req.body

    const userIsExist = await User.findUserByEmail(email)

    if (userIsExist) {
        throw new SendErrorResponse({
            message: 'Email has already been registered',
        })
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role,
    })

    // grab token and send to email
    const confirmEmailToken = user.generateEmailConfirmToken()

    await user.save({ validateBeforeSave: false })

    const sendResult = await sendEmail({
        email: user.email,
        subject: 'Email confirmation token',
        html: emailConfirmationTemplate({ req, confirmEmailToken }),
    })

    sendSuccessResponse({
        res,
        message: ` You have just registered successfully and we have sent an email verification message to ${email} check your inbox to verify `,
    })
})

/**
 * @desc    Confirm Email
 * @route   GET /api/auth/confirmemail
 * @access  Public
 */
exports.confirmEmail = asyncHandler(async (req, res, next) => {
    // grab token from email
    const { token } = req.query

    if (!token) {
        return next(new SendErrorResponse({ message: 'Invalid Token' }))
    }

    const splitToken = token.split('.')[0]

    const confirmEmailToken = createToken({ token: splitToken })

    // get user by token
    const user = await User.findOne({
        confirmEmailToken,
        isEmailConfirmed: false,
    })

    if (!user) {
        throw new SendErrorResponse({ message: 'Invalid Token' })
    }

    // update confirmed to true
    user.confirmEmailToken = undefined
    user.isEmailConfirmed = true

    user.save({ validateBeforeSave: false })

    const jwt = user.getSignedJwtToken()
    sendSuccessResponse({
        data: { token: `Berar ${token}` },
    })
})

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.loginController = asyncHandler(async (req, res, next) => {
    const { hasError, errors } = getValidationResult(req)

    if (hasError) {
        throw new SendErrorResponse({
            message: 'Login validation failed',
            data: errors,
        })
    }

    const { email, password } = req.body

    const foundUser = await User.findUserByEmail(email)

    if (!foundUser) {
        throw new SendErrorResponse({
            message: 'Invalid Email or Password',
        })
    }

    const isPasswordMatch = await foundUser.matchPassword(password)

    if (!isPasswordMatch) {
        throw new SendErrorResponse({
            message: 'Invalid Email or Password',
        })
    }

    const token = foundUser.getSignedJwtToken()

    sendSuccessResponse({
        res,
        message: 'Login successful',
        data: { token: `Berar ${token}` },
    })
})
