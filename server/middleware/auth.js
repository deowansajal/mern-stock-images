const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        // Set token from Bearer token in header
        token = authorization.split(' ')[1]
    }

    // Make sure token exists
    if (!token) {
        throw new ErrorResponse({
            message: 'Not authorized to access this route',
            code: 401,
        })
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (err) {
        throw new ErrorResponse({
            message: 'Not authorized to access this route',
            code: 401,
        })
    }
})

// Grant access to specific roles
// exports.authorize = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return next(
//                 new ErrorResponse(
//                     `User role ${req.user.role} is not authorized to access this route`,
//                     403
//                 )
//             )
//         }
//         next()
//     }
// }
