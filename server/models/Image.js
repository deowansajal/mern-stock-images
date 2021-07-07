const mongoose = require('mongoose')

const commonSchema = require('../utils/commonSchema')

const ImageSchema = new mongoose.Schema({
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
    thumbnailImage: {
        name: {
            ...commonSchema(),
        },

        path: {
            ...commonSchema(),
        },
    },
    price: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Image', ImageSchema)
