const router = require('express').Router()

const {
    createOrderController,
    getAllOrdersByIdController,
} = require('../controllers/orderController')

const { protect } = require('../middleware/auth')

router.post('/', protect, createOrderController)
router.get('/', protect, getAllOrdersByIdController)

module.exports = router
