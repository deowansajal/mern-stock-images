const router = require('express').Router()

const {
    createOrderController,
    getAllOrdersByIdController,
    getOrderCheckoutSessionController,
} = require('../controllers/orderController')

const { protect } = require('../middleware/auth')

router.post('/', protect, createOrderController)

router.get('/', protect, getAllOrdersByIdController)

router.get(
    '/checkout-session/:sessionId',
    protect,
    getOrderCheckoutSessionController
)

module.exports = router
