const fs = require('fs')

const Order = require('../models/Order')
const User = require('../models/User')

const asyncHandler = require('../middleware/asyncHandler')
const imageValidator = require('../middleware/imageValidator')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/ErrorResponse')
const getValidationResult = require('../utils/getValidationResult')
const Image = require('../models/Image')
const s3 = require('../config/s3')

const { getCustomersList, getCustomerById } = require('../config/stripe')

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

exports.getCustomersController = asyncHandler(async (req, res, next) => {
    const customers = await getCustomersList()

    console.log('All Customers')
    sendSuccessResponse({
        res,
        message: 'Get All Customers successful',
        data: {
            customers,
        },
    })
})

exports.getCustomerController = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const customer = await getCustomerById(id)

    if (!customer) {
        throw new ErrorResponse({ message: 'Customer not found', code: 404 })
    }

    const user = await User.findOne({ customer: customer.id }).select(
        'name email'
    )

    console.log('Single Customer..')

    const orders = await Order.find({ 'customer.id': id })
        .select('-customer -orderItems')
        .populate({
            path: 'subscription',
            select: 'status',
        })

    sendSuccessResponse({
        res,
        message: 'Get all order for  customer successful',
        data: {
            customer,
            orders,
            user,
        },
    })
})
