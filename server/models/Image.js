const mongoose = require('mongoose')

const commonSchema = require('../utils/commonSchema')

const ImageSchema = new mongoose.Schema({
    name: {
        ...commonSchema(),
    },
    description: {
        ...commonSchema(),
    },

    price: {
        type: Number,
        required: true,
    },

    thumbnail: {
        ...commonSchema(),
    },

    path: {
        ...commonSchema(),
    },

    mainImage: {
        eTag: {
            ...commonSchema(),
        },
        key: {
            ...commonSchema(),
        },
        location: {
            ...commonSchema(),
        },
        bucket: {
            ...commonSchema(),
        },
    },
})

module.exports = mongoose.model('Image', ImageSchema)
