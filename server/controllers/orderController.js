const Subscription = require('../models/Subscription')

const { createSession } = require('../config/stripe')
const asyncHandler = require('../middleware/asyncHandler')

exports.createCheckoutSessionController = asyncHandler(
    async (req, res, next) => {
        console.log('Creating checkout session')
        const session = await createSession({
            req,
        })

        if (session.mode === 'subscription') {
            const subscription = await Subscription.create({
                id: session.id,
                paymentStatus: session.payment_status,
                paymentMethod: session.payment_method_types[0],
                userId: req.user._id,
            })

            console.log('subscription created', subscription)
        }

        // console.log(session)
        res.status(201).json({ sessionId: session.id, session })
    }
)
