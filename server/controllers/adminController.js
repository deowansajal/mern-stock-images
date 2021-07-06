const asyncHandler = require('../middleware/asyncHandler')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/ErrorResponse')
const getValidationResult = require('../utils/getValidationResult')
const Image = require('../models/Image')

exports.uploadController = asyncHandler(async (req, res, next) => {
    const { errors, hasError } = getValidationResult(req)
    console.log(req.file)

    if (hasError) {
        throw new ErrorResponse({ message: 'Uploading failed', error: errors })
    }

    const { price } = req.body
    const { key, location, bucket, size, originalname } = req.file

    const image = await Image.create({
        price,
        originalname,
        location,
        size,
        bucket,
        key,
    })

    sendSuccessResponse({ res, message: 'Upload successful', data: image })
})
