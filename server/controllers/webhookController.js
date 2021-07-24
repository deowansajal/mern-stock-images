const stripe = require('stripe')
const asyncHandler = require('../middleware/asyncHandler')

const Subscription = require('../models/Subscription')
const User = require('../models/User')
const Order = require('../models/Order')

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

const createSubscription = async subscriptionObj => {
    const subscription = await Subscription.findOne({
        'customer.id': subscriptionObj.customer,
    })

    if (subscription) {
        subscription.id = subscriptionObj.id
        subscription.status = subscription.status
        subscription.plan.productId = subscriptionObj.plan.product
        const savedSubscription = await subscription.save()
    }
}

const updateSubscriptionStatus = async subscriptionObj => {
    const subscription = await Subscription.findOne({
        'customer.id': subscriptionObj.customer,
    })

    if (subscription) {
        subscription.status = subscriptionObj.status
        const savedSubscription = await subscription.save()
    }
}

const setInvoice = async invoiceObj => {
    const subscription = await Subscription.findOne({
        'customer.id': invoiceObj.customer,
    })

    if (subscription) {
        subscription.invoice.paid = invoiceObj.paid
        subscription.invoice.status = invoiceObj.status
        const savedSubscription = await subscription.save()
    }
}

const subscriptionSessionComplete = async session => {
    const subscription = await Subscription.findOne({
        sessionId: session.id,
    })

    if (subscription) {
        subscription.customer.id = session.customer
        subscription.payment.status = session.payment_status
        const savedSubscription = await subscription.save()
    }
}

const paymentSessionComplete = async session => {
    const order = await Order.findOne({ sessionId: session.id })
    if (!order) {
        return res.status(404).send(`Order Not Found`)
    }
    order.paymentResult.status = session.payment_status
    order.isPaid = true
    const savedOrder = await order.save()
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

            const order = await Order.findOne({ sessionId: session.id })
            order.payment.status = session.payment_status
            order.customer.id = session.customer
            order.customer.email = session.customer_email
            const savedOrder = await order.save()
            console.log(savedOrder)

            const user = await User.findById(order.user)
            user.customer = session.customer
            user.images.push(order._id)
            const savedUser = await user.save()
            console.log(savedUser)
            break

        // case 'customer.subscription.created':
        //     await createSubscription(data.object)
        //     break

        // case 'invoice.paid':

        //     await setInvoice(data.object)
        //     break
        // case 'customer.subscription.updated':
        //     await updateSubscriptionStatus(data.object)
        //     break

        // case 'invoice.payment_failed':
        //     console.log(data.object)
        //     break

        default:
            console.log(`unHandle event type ${type} =`)
        // console.log(data.object)
    }

    // Return a res to acknowledge receipt of the event
    return res.json({ received: true })
})

module.exports = webhookController
