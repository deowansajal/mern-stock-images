const Customer = require('../models/Customer')
const Order = require('../models/Order')

const {
    createSession,
    getSessionById,
    getCustomerById,
} = require('../config/stripe')

const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const sendSuccessResponse = require('../utils/sendSuccessResponse')

exports.createOrderController = asyncHandler(async (req, res, next) => {
    const { orderItems } = req.body
    const { email, _id, customer } = req.user

    const session = await createSession({
        customer,
        lineItems: orderItems.map(item => ({
            quantity: 1,
            amount: item.price,
            currency: 'usd',
            name: item.name,
        })),
    })

    const totalPrice = orderItems.reduce((acc, item) => {
        return acc + item.price
    }, 0)

    const order = await Order.create({
        user: _id,
        sessionId: session.id,
        orderItems,
        totalPrice,
        payment: {
            method: session.payment_method_types[0],
            status: session.payment_status,
        },
        mode: session.mode,
    })

    // console.log(order, session)
    res.json({ sessionId: session.id })
})

exports.getAllOrdersByIdController = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
        .populate({
            path: 'subscription',
        })
        .sort('-createdAt')

    return sendSuccessResponse({
        res,
        message: 'All Order request successful',
        data: {
            orders,
        },
    })
})

exports.getOrderCheckoutSessionController = asyncHandler(
    async (req, res, next) => {
        const { sessionId } = req.params

        console.log(sessionId)

        const session = await getSessionById(sessionId)
        const { id, name, email } = await getCustomerById(session.customer)

        return sendSuccessResponse({
            res,
            message: 'Getting session request successful',
            data: {
                paymentStatus: session.payment_status,
                customer: { id, name, email },
            },
        })
    }
)
