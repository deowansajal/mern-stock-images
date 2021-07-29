const fs = require('fs')

const mongoose = require('mongoose')

const Order = require('../models/Order')
const User = require('../models/User')
const Image = require('../models/Image')
const asyncHandler = require('../middleware/asyncHandler')
const imageValidator = require('../middleware/imageValidator')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/ErrorResponse')
const getValidationResult = require('../utils/getValidationResult')
const s3 = require('../config/s3')
const { getProductById, getInvoiceById } = require('../config/stripe')
const { getCustomersList, getCustomerById } = require('../config/stripe')

// @desc      Upload image
// @route     POST /api/admin/upload
// @access    Admin
exports.uploadController = asyncHandler(async (req, res, next) => {
    const { mainImage, thumbnail } = req.files
    const { name, price, description } = req.body

    const { imageId } = req.query

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

    let newImage

    if (!imageId) {
        newImage = await Image.create({ ...imageData })
    }

    if (imageId) {
        newImage = await Image.findByIdAndUpdate(
            imageId,
            { $set: { ...imageData } },
            { new: true }
        )

        if (!newImage) {
            throw new ErrorResponse({
                code: 404,
                message: 'Image not found!',
            })
        }

        const orders = await Order.find({
            'orderItems.id': newImage._id,
            'orderItems.isUpdated': false,
            'payment.status': 'paid',
        })

        if (orders.length > 0) {
            for (const order of orders) {
                for (const orderItem of order.orderItems) {
                    orderItem.isUpdated = true
                    await order.save()
                }
            }
        }
    }

    await fs.promises.unlink(mainImage[0].path)

    sendSuccessResponse({
        res,
        message: 'Upload successful',
        data: {
            name,
            price,
            description,
            thumbnail: newImage.thumbnail,
            id: newImage._id,
        },
    })
})

// @desc      Get all customers
// @route     GET /api/admin/customers
// @access    Admin
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

// @desc      Get single customer by id
// @route     GET /api/admin/customers/:id
// @access    Admin
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

// @desc      Get customer order bt customer and order id
// @route     GET /api/admin/customers/:id/:order
// @access    Admin
exports.getOrderController = asyncHandler(async (req, res, next) => {
    const { order: id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ErrorResponse({
            message: 'Invalid Request',
        })
    }
    let order = await Order.findOne({
        _id: mongoose.Types.ObjectId(id),
    }).populate({
        path: 'subscription',
    })

    if (order.subscription) {
        const product = await getProductById(order.subscription.plan.productId)
        const invoice = await getInvoiceById(order.subscription.invoice.id)

        const subscriptionDetails = {
            productName: product.name,
            invoicePdf: invoice.invoice_pdf,
            interval: invoice.lines.data[0].plan.interval,
            price: invoice.lines.data[0].plan.amount,
        }

        order = order.toObject()
        order.subscription.details = subscriptionDetails
    }

    return sendSuccessResponse({
        res,
        message: 'Get Order request successful',
        data: {
            order,
        },
    })
})
