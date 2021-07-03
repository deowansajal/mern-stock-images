const router = require('express').Router()

const {
    registerValidator,
    loginValidator,
} = require('../middleware/authValidator')
const {
    registerController,
    loginController,
    confirmEmail,
    deleteAllUsers,
} = require('../controllers/auth')

router.post('/register', registerValidator, registerController)
router.post('/login', loginValidator, loginController)

router.get('/confirmemail', confirmEmail)

router.delete('/users', deleteAllUsers)

module.exports = router

// // @desc      Login user
// // @route     POST /api/auth/login
// // @access    Public
// exports.login = asyncHandler(async (req, res, next) => {
//     const { email, password } = req.body

//     // Validate emil & password
//     if (!email || !password) {
//         return next(
//             new SendErrorResponse('Please provide an email and password', 400)
//         )
//     }

//     // Check for user
//     const user = await User.findOne({ email }).select('+password')

//     if (!user) {
//         return next(new SendErrorResponse('Invalid credentials', 401))
//     }

//     // Check if password matches
//     const isMatch = await user.matchPassword(password)

//     if (!isMatch) {
//         return next(new SendErrorResponse('Invalid credentials', 401))
//     }

//     sendTokenResponse(user, 200, res)
// })

// // @desc      Log user out / clear cookie
// // @route     GET /api/auth/logout
// // @access    Public
// exports.logout = asyncHandler(async (req, res, next) => {
//     res.cookie('token', 'none', {
//         expires: new Date(Date.now() + 10 * 1000),
//         httpOnly: true,
//     })

//     res.status(200).json({
//         success: true,
//         data: {},
//     })
// })

// // @desc      Get current logged in user
// // @route     GET /api/auth/me
// // @access    Private
// exports.getMe = asyncHandler(async (req, res, next) => {
//     // user is already available in req due to the protect middleware
//     const user = req.user

//     res.status(200).json({
//         success: true,
//         data: user,
//     })
// })

// // @desc      Update user details
// // @route     PUT /api/auth/updatedetails
// // @access    Private
// exports.updateDetails = asyncHandler(async (req, res, next) => {
//     const fieldsToUpdate = {
//         name: req.body.name,
//         email: req.body.email,
//     }

//     const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
//         new: true,
//         runValidators: true,
//     })

//     res.status(200).json({
//         success: true,
//         data: user,
//     })
// })

// // @desc      Update password
// // @route     PUT /api/auth/updatepassword
// // @access    Private
// exports.updatePassword = asyncHandler(async (req, res, next) => {
//     const user = await User.findById(req.user.id).select('+password')

//     // Check current password
//     if (!(await user.matchPassword(req.body.currentPassword))) {
//         return next(new SendErrorResponse('Password is incorrect', 401))
//     }

//     user.password = req.body.newPassword
//     await user.save()

//     sendTokenResponse(user, 200, res)
// })

// // @desc      Forgot password
// // @route     POST /api/auth/forgotpassword
// // @access    Public
// exports.forgotPassword = asyncHandler(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email })

//     if (!user) {
//         return next(new SendErrorResponse('There is no user with that email', 404))
//     }

//     // Get reset token
//     const resetToken = user.getResetPasswordToken()

//     await user.save({ validateBeforeSave: false })

//     // Create reset url
//     const resetUrl = `${req.protocol}://${req.get(
//         'host'
//     )}/api/auth/resetpassword/${resetToken}`

//     const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`

//     try {
//         await sendEmail({
//             email: user.email,
//             subject: 'Password reset token',
//             message,
//         })

//         res.status(200).json({ success: true, data: 'Email sent' })
//     } catch (err) {
//         console.log(err)
//         user.resetPasswordToken = undefined
//         user.resetPasswordExpire = undefined

//         await user.save({ validateBeforeSave: false })

//         return next(new SendErrorResponse('Email could not be sent', 500))
//     }
// })

// // @desc      Reset password
// // @route     PUT /api/auth/resetpassword/:resettoken
// // @access    Public
// exports.resetPassword = asyncHandler(async (req, res, next) => {
//     // Get hashed token
//     const resetPasswordToken = crypto
//         .createHash('sha256')
//         .update(req.params.resettoken)
//         .digest('hex')

//     const user = await User.findOne({
//         resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() },
//     })

//     if (!user) {
//         return next(new SendErrorResponse('Invalid token', 400))
//     }

//     // Set new password
//     user.password = req.body.password
//     user.resetPasswordToken = undefined
//     user.resetPasswordExpire = undefined
//     await user.save()

//     sendTokenResponse(user, 200, res)
// })

// /**
//  * @desc    Confirm Email
//  * @route   GET /api/auth/confirmemail
//  * @access  Public
//  */
// exports.confirmEmail = asyncHandler(async (req, res, next) => {
//     // grab token from email
//     const { token } = req.query

//     if (!token) {
//         return next(new SendErrorResponse('Invalid Token', 400))
//     }

//     const splitToken = token.split('.')[0]
//     const confirmEmailToken = crypto
//         .createHash('sha256')
//         .update(splitToken)
//         .digest('hex')

//     // get user by token
//     const user = await User.findOne({
//         confirmEmailToken,
//         isEmailConfirmed: false,
//     })

//     if (!user) {
//         return next(new SendErrorResponse('Invalid Token', 400))
//     }

//     // update confirmed to true
//     user.confirmEmailToken = undefined
//     user.isEmailConfirmed = true

//     // save
//     user.save({ validateBeforeSave: false })

//     // return token
//     sendTokenResponse(user, 200, res)
// })

// // Get token from model, create cookie and send response
// const sendTokenResponse = (user, statusCode, res) => {
//     // Create token
//     const token = user.getSignedJwtToken()

//     const options = {
//         expires: new Date(
//             Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true,
//     }

//     if (process.env.NODE_ENV === 'production') {
//         options.secure = true
//     }

//     res.status(statusCode).cookie('token', token, options).json({
//         success: true,
//         token,
//     })
// }
