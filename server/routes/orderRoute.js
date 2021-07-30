const router = require('express').Router()

const {
    createOrderController,
    getOrdersController,
    getOrderController,
    getOrderCheckoutSessionController,
    refreshOrderController,
} = require('../controllers/orderController')

const { protect } = require('../middleware/auth')

router.post('/', protect, createOrderController)

router.get('/', protect, getOrdersController)
router.get('/:id', protect, getOrderController)
router.put('/refresh', protect, refreshOrderController)

router.get(
    '/checkout-session/:sessionId',
    protect,
    getOrderCheckoutSessionController
)

module.exports = router
