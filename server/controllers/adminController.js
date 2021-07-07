const fs = require('fs')

const asyncHandler = require('../middleware/asyncHandler')
const imageValidator = require('../middleware/imageValidator')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/ErrorResponse')
const getValidationResult = require('../utils/getValidationResult')
const Image = require('../models/Image')
const s3 = require('../config/s3')

5
exports.uploadController = asyncHandler(async (req, res, next) => {
    const { mainImage, thumbnailImage } = req.files

    let imageData = {
        price: req.body.price,
    }

    if (thumbnailImage) {
        imageData = {
            ...imageData,
            thumbnailImage: {
                name: thumbnailImage[0].filename,
                path: thumbnailImage[0].path,
            },
        }
    }

    if (mainImage) {
        const s3Res = await s3.uploadFile(mainImage[0])
        imageData = {
            ...imageData,
            mainImage: {
                eTag: s3Res.ETag,
                key: s3Res.key,
                location: s3Res.Location,
                bucket: s3Res.Bucket,
            },
        }
    }

    req.body = {
        ...req.body,
        ...imageData,
    }

    // Image validation imperatively
    const imperativeValidator = getValidationResult({ req, imperative: true })

    const { hasError, errors } = await imperativeValidator(imageValidator)

    if (hasError) {
        throw new ErrorResponse({ message: 'Uploading failed', error: errors })
    }

    const newImage = await Image.create({ ...imageData })

    fs.promises.unlink(mainImage[0].path)

    sendSuccessResponse({
        res,
        message: 'Upload successful',
        data: {
            price: newImage.price,
            thumbnail: newImage.thumbnailImage.name,
            id: newImage.id,
        },
    })
})
