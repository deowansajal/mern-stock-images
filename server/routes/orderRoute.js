const stripe = require('stripe')(
    'sk_test_51FVLV7DO38skYAGte1ijqSuOZfEEirj0V7F5WGvVioq20mupieXGwg1Tq0ZLJ5BiB4mnAN7OLaYWaXhtaYI0iHz500WStdlL0T'
)
const router = require('express').Router()

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Stubborn Attachments',
                        images: ['https://i.imgur.com/EHyR2nP.png'],
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/success`,
        cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
    })
    res.status(303).json({ sessionId: session.id })
})

module.exports = router
