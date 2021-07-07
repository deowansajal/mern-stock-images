const asyncHandler = require('../middleware/asyncHandler')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/ErrorResponse')
const getValidationResult = require('../utils/getValidationResult')
const Image = require('../models/Image')

exports.uploadController = asyncHandler(async (req, res, next) => {
    // console.log('top')
    const { errors, hasError } = getValidationResult(req)
    console.log('req.files', req.file)

    if (hasError) {
        throw new ErrorResponse({ message: 'Uploading failed', error: errors })
    }

    sendSuccessResponse({
        res,
        message: 'Upload successful',
        data: req.file,
    })

    // const { price } = req.body
    // const { key, location, bucket, size, originalname } = req.file

    // const image = await Image.create({
    //     price,
    //     originalname,
    //     location,
    //     size,
    //     bucket,
    //     key,
    // })
})
