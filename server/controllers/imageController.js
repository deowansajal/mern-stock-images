const asyncHandler = require('../middleware/asyncHandler')
const Image = require('../models/Image')
const s3 = require('../config/s3')
const getAuthorizedImages = require('../utils/getAuthorizedImages')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/errorResponse')

// @desc      Get all images
// @route     GET /api/images
// @access    Public
exports.getAllImageController = asyncHandler(async (req, res, next) => {
    const images = await Image.find().select('-mainImage -path')
    res.json({ message: 'get all images', images })
})

// @desc      Get  image by id
// @route     GET /api/images/download/:id
// @access    Private
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
