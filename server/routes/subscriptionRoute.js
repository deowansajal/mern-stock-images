const router = require('express').Router()

const {
    getAllPricesListController,
    subscribeController,
} = require('../controllers/subscriptionController')

const { protect } = require('../middleware/auth')

router.get('/pricing', protect, getAllPricesListController)
router.post('/', protect, subscribeController)

module.exports = router
