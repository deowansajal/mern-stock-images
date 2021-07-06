const { body } = require('express-validator')

const message = require('../utils/message')
const commonValidator = require('../utils/commonValidator')

const imageValidator = [
    commonValidator('key'),
    commonValidator('originalname'),
    commonValidator('bucket'),
    body('price')
        .notEmpty()
        .withMessage(message.required('price'))
        .isNumeric()
        .withMessage('price must be number')
        .isInt()
        .withMessage('price must be integer'),
    commonValidator('location')
        .isURL()
        .withMessage('location must be valid URL'),
    body('size')
        .notEmpty()
        .withMessage(message.required('price'))
        .isNumeric()
        .withMessage('Size must be number')
        .isInt()
        .withMessage('Size must be integer'),
]

module.exports = imageValidator
