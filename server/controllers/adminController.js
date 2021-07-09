const fs = require('fs')

const asyncHandler = require('../middleware/asyncHandler')
const imageValidator = require('../middleware/imageValidator')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/ErrorResponse')
const getValidationResult = require('../utils/getValidationResult')
const Image = require('../models/Image')
const s3 = require('../config/s3')

exports.uploadController = asyncHandler(async (req, res, next) => {
    const { mainImage, thumbnail } = req.files
    const { name, price, description } = req.body

    let imageData = {
        name,
        price,
        description,
    }

    if (thumbnail) {
        imageData = {
            ...imageData,
            path: thumbnail[0].path,
            thumbnail: thumbnail[0].filename,
        }
    }

    let s3File

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
        ...imageData,
    }

    // Image validation imperatively
    const imperativeValidator = getValidationResult({ req, imperative: true })

    const { hasError, errors } = await imperativeValidator(imageValidator)

    if (hasError) {
        throw new ErrorResponse({ message: 'Uploading failed', error: errors })
    }

    const newImage = await Image.create({ ...imageData })

    await fs.promises.unlink(mainImage[0].path)

    sendSuccessResponse({
        res,
        message: 'Upload successful',
        data: {
            name,
            price,
            description,
            thumbnail: newImage.thumbnail,
            id: newImage.id,
        },
    })
})
