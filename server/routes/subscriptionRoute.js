const router = require('express').Router()

const {
    getAllPricesListController,
    subscribeController,
    manageBillingController,
} = require('../controllers/subscriptionController')

const { protect } = require('../middleware/auth')

router.get('/pricing', protect, getAllPricesListController)
router.post('/manage-billing', protect, manageBillingController)
router.post('/', protect, subscribeController)

module.exports = router
