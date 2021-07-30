const stripe = require('stripe')
const asyncHandler = require('../middleware/asyncHandler')

const Subscription = require('../models/Subscription')
const User = require('../models/User')
const Order = require('../models/Order')

// Configure webhook event
const setEvent = req => {
    const signature = req.headers['stripe-signature']
    let result = {}

    try {
        result.event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_END_POINT_SECRET
        )
    } catch (err) {
        result.error = err
    }
    return result
}

// Create an order after checkout session completed
const createOrder = async session => {
    const order = await Order.findOne({ sessionId: session.id })

    if (!order) {
        return
    }

    order.payment.status = session.payment_status
    order.customer.id = session.customer
    order.customer.email = session.customer_details.email
    order.paidAt = Date.now()
    await order.save()

    const user = await User.findById(order.user)
    user.customer = session.customer
    user.images.push(order._id)
    await user.save()
}

// Create a subscription after checkout session completed
const createSubscription = async session => {
    const subscription = await Subscription.findOne({
        sessionId: session.id,
    })

    if (!subscription) {
        return
    }
    const order = await Order.findOne({
        user: subscription.user,
        _id: subscription.order,
    })

    if (session.payment_status === 'paid') {
        order.mode = 'subscription'
        await order.save()
        subscription.status = 'active'
        subscription.id = session.subscription
        subscription.customer.id = session.customer
        subscription.payment.status = session.payment_status
        await subscription.save()
    }
}

// Create an invoice after invoice paid
const invoicePaid = async invoiceObj => {
    const subscription = await Subscription.findOne({
        id: invoiceObj.subscription,
    })

    if (!subscription) {
        return
    }

    subscription.invoice.id = invoiceObj.id
    subscription.status = 'active'
    subscription.invoice.status = invoiceObj.status
    await subscription.save()

    const order = await Order.findById(subscription.order)
    order.mode = 'subscription'
    order.subscription = subscription._id
    await order.save()
}

// Update customer subscription after update delete cancel
const customerSubscriptionUpdate = async subscriptionObj => {
    const subscription = await Subscription.findOne({
        id: subscriptionObj.id,
    })

    if (!subscription) {
        return
    }

    subscription.status = subscriptionObj.status
    if (subscription.plan) {
        subscription.plan.priceId = subscriptionObj.plan.id
        subscription.plan.productId = subscriptionObj.plan.product
    }
    await subscription.save()
}

const webhookController = asyncHandler(async (req, res) => {
    const { event, error: eventError } = setEvent(req)

    if (eventError) {
        return res.status(400).send(`Webhook Error: ${eventError.message}`)
    }

    const { type, data } = event

    switch (type) {
        case 'checkout.session.completed':
            const session = data.object

            if (session.mode === 'payment') {
                await createOrder(session)
            }

            if (session.mode === 'subscription') {
                await createSubscription(session)
            }

            break

        case 'invoice.paid':
            await invoicePaid(data.object)
            break

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            await customerSubscriptionUpdate(data.object)
            break

        default:
            console.log(`unHandle event type ${type} = `)
    }

    return res.send({ received: true })
})

module.exports = webhookController
