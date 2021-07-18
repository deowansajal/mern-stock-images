const Customer = require('../models/Customer')
const Order = require('../models/Order')

const { createSession } = require('../config/stripe')

const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const sendSuccessResponse = require('../utils/sendSuccessResponse')

exports.createOrderController = asyncHandler(async (req, res, next) => {
    const { orderItems } = req.body
    const { email, _id } = req.user

    console.log('Creating orderItems')
    console.log(' orderItems', orderItems)

    const session = await createSession({
        email: email,
        lineItems: orderItems.map(item => ({
            quantity: 1,
            amount: item.price,
            currency: 'usd',
            name: item.name,
        })),
    })

    const order = await Order.create({
        user: _id,
        sessionId: session.id,
        orderItems,
        totalPrice: orderItems.reduce((acc, item) => {
            return acc + item.price
        }, 0),
        paymentMethod: session.payment_method_types[0],
        paymentResult: {
            status: session.payment_status,
        },
    })

    res.json({ sessionId: session.id })
})

exports.getAllOrdersByIdController = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
    console.log(orders)

    return sendSuccessResponse({
        res,
        message: 'All Order request successful',
        data: {
            orders,
        },
    })
})
