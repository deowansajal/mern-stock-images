const mongoose = require('mongoose')

const Order = require('../models/Order')
const Subscription = require('../models/Subscription')

const {
    createSession,
    getSessionById,
    getCustomerById,
    getPriceById,
    getProductById,
    getInvoiceById,
    getSubscriptionById,
} = require('../config/stripe')

const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const sendSuccessResponse = require('../utils/sendSuccessResponse')

// @desc      Get  checkout completed session
// @route     GET /api/orders/checkout-session/:sessionId
// @access    Private
exports.getOrderCheckoutSessionController = asyncHandler(
    async (req, res, next) => {
        const { sessionId } = req.params

        const session = await getSessionById(sessionId)

        if (!session) {
            throw new ErrorResponse({
                message: 'Bad Request',
            })
        }

        return sendSuccessResponse({
            res,
            message: 'Getting session request successful',
            data: {
                paymentStatus: session.payment_status,
            },
        })
    }
)

// @desc      Create  order
// @route     POST /api/orders
// @access    Private
exports.createOrderController = asyncHandler(async (req, res, next) => {
    const { orderItems } = req.body
    const { _id, customer } = req.user

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

    await Order.create({
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

    res.json({ sessionId: session.id })
})

// @desc      Get user orders by user id
// @route     GET /api/orders
// @access    Private
exports.getOrdersController = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
        .select('subscription totalPrice payment createdAt mode')
        .populate({
            path: 'subscription',
            select: 'status',
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

// @desc      Get user order by user and order id
// @route     GET /api/orders/:id
// @access    Private
exports.getOrderController = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ErrorResponse({
            message: 'Invalid Request',
        })
    }
    let order = await Order.findOne({
        user: req.user._id,
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

// @desc      Refresh Order
// @route     PUT /api/orders/refresh
// @access    Private
exports.refreshOrderController = asyncHandler(async (req, res, next) => {
    const { orderId } = req.body

    const order = await Order.findById(orderId)
        .select('subscription totalPrice payment createdAt mode sessionId')
        .populate({
            path: 'subscription',
            select: 'status',
        })

    if (!order) {
        throw new ErrorResponse({
            code: 404,
            message: 'Order not found',
        })
    }

    const orderSession = await getSessionById(order.sessionId)
    let savedOrder

    if (orderSession && orderSession.payment_status !== order.payment.status) {
        order.payment.status = orderSession.payment_status
        order.customer.id = orderSession.customer
        order.customer.email = orderSession.customer_details.email
        order.mode = orderSession.mode
        savedOrder = await order.save()
    }

    const subscription = await Subscription.findOne({ order: order._id })
    let newOrder
    if (subscription) {
        const subscriptionSession = await getSessionById(subscription.sessionId)

        if (!subscriptionSession) {
            throw new ErrorResponse({
                message: 'Bad Request',
            })
        }

        const stripeSubscription = await getSubscriptionById(
            subscriptionSession.subscription
        )
        if (!stripeSubscription) {
            throw new ErrorResponse({
                message: 'Bad Request',
            })
        }
        order.mode = subscriptionSession.mode
        subscription.payment.status = subscriptionSession.payment_status
        subscription.id = stripeSubscription.id
        subscription.customer.id = stripeSubscription.customer
        subscription.customer.email = order.customer.email
        subscription.invoice.id = stripeSubscription.latest_invoice
        subscription.status = stripeSubscription.status
        subscription.plan.productId = stripeSubscription.plan.product
        subscription.plan.priceId = stripeSubscription.plan.id
        order.subscription = subscription._id
        const savedSubscription = await subscription.save()

        newOrder = savedOrder.toObject()
        newOrder.subscription = {
            _id: savedSubscription._id,
            status: savedSubscription.status,
        }
    }

    const data = {
        order: savedOrder,
    }

    if (newOrder) {
        data.order = newOrder
    }

    return sendSuccessResponse({
        res,
        message: 'Getting session request successful',
        data,
    })
})
