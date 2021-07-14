const router = require('express').Router()

const { createOrderController } = require('../controllers/orderController')

const { protect } = require('../middleware/auth')

router.post('/create-order', protect, createOrderController)

module.exports = router
