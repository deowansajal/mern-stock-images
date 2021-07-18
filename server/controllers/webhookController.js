const stripe = require('stripe')
const asyncHandler = require('../middleware/asyncHandler')

const Subscription = require('../models/Subscription')
const Customer = require('../models/Customer')
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

const createCustomer = async session => {
    const customer = await Customer.findOne({
        sessionId: session.id,
    })

    customer.id = session.customer
    customer.paymentStatus = session.payment_status
    customer.email = session.details.email
    const savedCustomer = await customer.save()
    // console.log(savedCustomer)
    return savedCustomer
}

// const createSubscription = async subscriptionObject => {
//     console.log(subscriptionObject)
//     console.log('subscriptionObject')
//     const subscription = await Subscription.findOne({
//         subscription: subscriptionObject.id,
//     })
//     subscription.subscription = subscriptionObject.subscription
//     subscription.status = subscriptionObject.status
//     subscription.customer = subscriptionObject.customer

//     return await subscription.save()
// }

const webhookController = asyncHandler(async (req, res) => {
    const { event, error: eventError } = setEvent(req)

    if (eventError) {
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    const { type, data } = event

    switch (type) {
        case 'checkout.session.completed':
            const session = data.object

            const order = await Order.findOne({ sessionId: session.id })

            if (order && session.payment_status === 'paid') {
                order.paymentResult.status = session.payment_status
                order.isPaid = true
                const savedOrder = await order.save()
            }

            break

        // case 'customer.subscription.created':
        //     const subscription = await createSubscription(data.object)
        //     break
        // case 'customer.subscription.succeed':
        //     const succeedSubscription = await Subscription.findOne({
        //         subscription: data.object.subscription,
        //     })

        //     succeedSubscription.status = data.object.status
        //     const savedSucceedSubscription = await succeedSubscription.save()
        //     console.log(savedSucceedSubscription)
        //     break

        // case 'payment_intent.succeeded':
        case 'payment_intent.created':
            break

        default:
            console.log(`unHandle event type ${type}`)
    }

    // Return a res to acknowledge receipt of the event
    return res.json({ received: true })
})

module.exports = webhookController
