const asyncHandler = require('../middleware/asyncHandler')
const Image = require('../models/Image')
const s3 = require('../config/s3')
const getAuthorizedImages = require('../utils/getAuthorizedImages')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/errorResponse')

exports.getAllImageController = asyncHandler(async (req, res, next) => {
    const images = await Image.find().select('-mainImage -path')
    res.json({ message: 'get all images', images })
})

exports.getImageByIdController = asyncHandler(async (req, res, next) => {
    const image = await Image.find({ _id: req.params.id }).select(
        '-mainImage -path'
    )
    res.json({ message: 'get all image', image })
})

exports.downloadImageController = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { _id } = req.user

    const imagesIds = await getAuthorizedImages(req)

    const isAuthorized = imagesIds.some(imageId => imageId === id)

    if (!isAuthorized) {
        throw new ErrorResponse({ statusCode: 401, message: 'Unauthorized!' })
    }

    const image = await Image.findById(id)

    const oneTimeDownloadLink = await s3.sendSignedUrl(image.mainImage.key)

    sendSuccessResponse({
        res,
        message: 'One time download request successful',
        data: {
            oneTimeDownloadLink,
        },
    })
})
