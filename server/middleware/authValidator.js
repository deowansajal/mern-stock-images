const { body } = require('express-validator')

const message = require('../utils/message')
const commonValidator = require('../utils/commonValidator')

const emailValidator = () => {
    return body('email')
        .notEmpty()
        .withMessage(message.required('Email'))

        .isEmail()
        .withMessage(message.notValid('Email'))
        .normalizeEmail()
}

const passwordValidator = () => {
    return commonValidator('password')
        .isLength({ min: 6, max: 30 })
        .withMessage(message.minMax({ name: 'Password', min: 6, max: 30 }))
}

const nameValidator = () => {
    return commonValidator('name')
        .isLength({ min: 3, max: 30 })
        .withMessage(message.minMax({ name: 'Name', min: 3, max: 30 }))
}

const signupValidator = [
    nameValidator(),
    emailValidator(),
    body('role')
        .optional()
        .not()
        .isIn(['user', 'admin'])
        .withMessage('User role should be user or admin'),
    passwordValidator(),
]
const loginValidator = [emailValidator(), passwordValidator()]

module.exports = {
    signupValidator,
    loginValidator,
}
