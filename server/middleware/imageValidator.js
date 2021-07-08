const { body } = require('express-validator')

const message = require('../utils/message')
const commonValidator = require('../utils/commonValidator')

const imageValidator = [
    commonValidator('name')
        .isLength({ min: 3, max: 100 })
        .withMessage(message.minMax({ name: 'name', min: 3, max: 100 })),
    commonValidator('description')
        .isLength({ min: 5, max: 5000 })
        .withMessage(
            message.minMax({ name: 'description', min: 5, max: 5000 })
        ),
    ,
    body('price')
        .notEmpty()
        .withMessage(message.required('price'))
        .isNumeric()
        .withMessage('price must be number')
        .isInt()
        .withMessage('price must be integer'),
    commonValidator('thumbnail'),
    commonValidator('path'),
    commonValidator('mainImage.key'),
    commonValidator('mainImage.eTag'),
    commonValidator('mainImage.bucket'),
    commonValidator('mainImage.location')
        .isURL()
        .withMessage('location must be valid URL'),
]

module.exports = imageValidator
