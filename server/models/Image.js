const mongoose = require('mongoose')

const commonSchema = require('../utils/commonSchema')

const ImageSchema = new mongoose.Schema({
    originalname: {
        ...commonSchema(),
    },
    key: {
        ...commonSchema(),
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        ...commonSchema(),
    },
    bucket: {
        ...commonSchema(),
    },
    size: { type: Number, required: true },
})

module.exports = mongoose.model('Image', ImageSchema)
