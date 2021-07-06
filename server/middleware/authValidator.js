const { body } = require('express-validator')

const message = {
    required: name => `${name} is required!`,
    string: name => `${name} should be valid string`,
    notValid: name => `${name} is not valid`,
    minMax: ({ name, min, max }) =>
        `${name} should be between ${min} and ${max}  characters`,
}

const commonValidator = name => {
    return body(name)
        .notEmpty()
        .withMessage(message.required(name))
        .isString()
        .withMessage(message.string(name))
        .trim()
}

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
