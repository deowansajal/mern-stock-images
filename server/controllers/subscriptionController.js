const Subscription = require('../models/Subscription')

const asyncHandler = require('../middleware/asyncHandler')
const sendSuccessResponse = require('../utils/sendSuccessResponse')

const stripe = require('../config/stripe')

exports.getAllPricesListController = asyncHandler(async (req, res, next) => {
    const recurringProducts = await stripe.getRecurringProducts()

    // console.log('recurringProducts', recurringProducts)
    sendSuccessResponse({
        res,
        message: 'Prices list retrieved successfully',
        data: {
            recurringProducts,
        },
    })
})

exports.subscribeController = asyncHandler(async (req, res, next) => {
    const { mode } = req.query
    const { priceId } = req.body.data
    const { email, _id } = req.user
    const session = await stripe.createSession({
        mode,
        lineItems: [{ price: priceId, quantity: 1 }],
        email,
    })

    const subscription = await Subscription.create({
        sessionId: session.id,
        userId: _id,
        plan: {
            priceId,
        },

        payment: {
            status: session.payment_status,
            method: session.payment_method_types[0],
        },
    })

    sendSuccessResponse({
        res,
        message: 'Prices list retrieved successfully',
        data: {
            sessionId: session.id,
        },
    })
})
