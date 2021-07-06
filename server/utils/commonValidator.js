const { body } = require('express-validator')
const message = require('../utils/message')
const commonValidator = name => {
    return body(name)
        .notEmpty()
        .withMessage(message.required(name))
        .isString()
        .withMessage(message.string(name))
        .trim()
}

module.exports = commonValidator
