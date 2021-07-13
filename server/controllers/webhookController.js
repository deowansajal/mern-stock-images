const stripe = require('stripe')
const axios = require('axios')

const Subscription = require('../models/Subscription')

const createSubscription = async session => {
    const subscription = await Subscription.findOne({ id: session.id })
    subscription.paymentStatus = session.payment_status
    subscription.subscription = session.subscription
    subscription.customer = session.customer
    const createdSubscription = await subscription.save()
    console.log('createdSubscription start')
    console.log(createdSubscription)
    console.log('createdSubscription end')
}

const webhookController = async (req, res) => {
    const signature = req.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_END_POINT_SECRET
        )
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        createSubscription(event.data.object)
    }

    switch (event.type) {
        // case 'customer.created':
        //     const customerCreated = event.data.object
        //     console.log(customerCreated)
        //     console.log('customerCreated) end')

        //     break
        // case 'invoice.created':
        //     const invoiceCreated = event.data.object
        //     console.log(invoiceCreated)
        //     console.log('invoiceCreated) end')
        //     break

        // case 'invoice.paid':
        // const invoice = event.data.object
        // subscription = await Subscription.findOne({
        //     subscription: invoice.subscription,
        // })

        // subscription.invoicePdf = invoice.invoice_pdf
        // subscription.invoiceStatus = invoice.status

        // updatedSubscription = await subscription.save()
        // console.log(updatedSubscription)
        // console.log('updatedSubscription')
        // console.log(invoice)
        // console.log('invoice')

        // break

        // case 'customer.created':
        //     const customer = event.data.object
        //     console.log(customer)
        //     console.log('customer end')

        // case 'payment_intent.succeeded':
        //     const paymentIntentSucceeded = event.data.object
        //     console.log(paymentIntentSucceeded)
        //     console.log('paymentIntentSucceeded end')

        // case 'customer.created':
        //     const customerCreated = event.data.object
        //     console.log(customerCreated)
        //     console.log('customerCreated end')

        //     break
        // case 'customer.subscription.created':
        //     const createdSubscription = event.data.object
        //     subscription = await Subscription.findOne({
        //         subscription: createdSubscription.subscription,
        //     })
        //     subscription.currentPeriodStart =
        //         createdSubscription.current_period_start
        //     subscription.currentPeriodEnd =
        //         createdSubscription.current_period_end
        //     updatedSubscription = await subscription.save()
        //     console.log(updatedSubscription)
        //     console.log('updatedSubscription end')
        //     break

        default:
            console.log(`Unhandled event type ${event.type} index = `)
    }

    // Return a res to acknowledge receipt of the event
    return res.json({ received: true })
}

module.exports = webhookController
