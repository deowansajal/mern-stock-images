const { body } = require('express-validator')

const message = require('../utils/message')
const commonValidator = require('../utils/commonValidator')

const imageValidator = [
    commonValidator('mainImage.key'),
    commonValidator('mainImage.eTag'),
    commonValidator('mainImage.bucket'),
    commonValidator('mainImage.location')
        .isURL()
        .withMessage('location must be valid URL'),
    commonValidator('thumbnailImage.name'),
    commonValidator('thumbnailImage.path'),
    body('price')
        .notEmpty()
        .withMessage(message.required('price'))
        .isNumeric()
        .withMessage('price must be number')
        .isInt()
        .withMessage('price must be integer'),
]

module.exports = imageValidator
