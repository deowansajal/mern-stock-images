const Order = require('../models/Order')

const asyncHandler = require('../middleware/asyncHandler')
const sendSuccessResponse = require('../utils/sendSuccessResponse')
const ErrorResponse = require('../utils/errorResponse')

const stripe = require('../config/stripe')
const Subscription = require('../models/Subscription')

// @desc      Pricing
// @route     GET /api/subscription/pricing
// @access    Private
exports.getAllPricesListController = asyncHandler(async (req, res, next) => {
    const recurringProducts = await stripe.getTestRecurringProducts()
    console.log(recurringProducts)
    sendSuccessResponse({
        res,
        message: 'Prices list retrieved successfully',
        data: {
            recurringProducts,
        },
    })
})

// @desc      Subscribe
// @route     POST /api/subscription
// @access    Private
exports.subscribeController = asyncHandler(async (req, res, next) => {
    const { mode } = req.query
    const { priceId, orderId } = req.body.data
    const { customer, _id } = req.user

    const order = await Order.findById(orderId)

    if (order.mode === 'subscription') {
        throw new ErrorResponse({
            message: 'You are already subscribed the order',
        })
    }

    const session = await stripe.createSession({
        mode,
        customer,
        lineItems: [{ price: priceId, quantity: 1 }],
    })

    const subscription = await Subscription.create({
        sessionId: session.id,
        order: orderId,
        user: _id,
        plan: {
            priceId,
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

// @desc      Manage subscription billing
// @route     POST /api/subscription/manage-billing
// @access    Private
exports.manageBillingController = asyncHandler(async (req, res, next) => {
    const { customer, _id } = req.user

    const { subscriptionId } = req.body.data

    const session = await stripe.createCustomerPortalSession(customer)

    sendSuccessResponse({
        res,
        message: 'Prices list retrieved successfully',
        data: {
            url: session.url,
        },
    })
})
