const Customer = require('../models/Customer')
const Order = require('../models/Order')

const { createSession } = require('../config/stripe')

const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')

exports.createOrderController = asyncHandler(async (req, res, next) => {
    const { orderItems } = req.body
    const { email, _id } = req.user

    const session = await createSession({
        email: email,
        lineItems: orderItems.map(item => ({
            quantity: item.quantity,
            amount: item.price,
            currency: 'usd',
            name: item.name,
        })),
    })

    console.log(orderItems)
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

    res.json({ order, url: session.url })

    // const { email, _id } = req.user

    // const customer = await Customer.findOne({ userId: _id })

    // if (!customer) {
    //     throw new ErrorResponse({message: ''})
    // }

    // res.status(201).json({ sessionId: session.id, session })
})
