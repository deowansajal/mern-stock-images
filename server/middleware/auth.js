const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
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

// Grant access to admin
exports.isAdmin = (req, res, next) => {
    if (!req.user) {
        throw new ErrorResponse({
            message: 'Forbidden',
            code: 403,
        })
    }
    if (req.user.role !== 'admin') {
        throw new ErrorResponse({
            message: 'Forbidden',
            code: 403,
        })
    }

    return next()
}
