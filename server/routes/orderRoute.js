const router = require('express').Router()

const {
    createCheckoutSessionController,
} = require('../controllers/orderController')

const { protect } = require('../middleware/auth')

router.post(
    '/create-checkout-session',
    protect,
    createCheckoutSessionController
)

module.exports = router
