const router = require('express').Router()

const uploadFields = require('../middleware/uploadFields')
const { protect, isAdmin } = require('../middleware/auth')
const {
    uploadController,
    getCustomersController,
    getCustomerController,
    getOrderController,
} = require('../controllers/adminController')

router.get('/customers/:id/:order', protect, isAdmin, getOrderController)
router.get('/customers/:id', protect, isAdmin, getCustomerController)
router.get('/customers', protect, isAdmin, getCustomersController)
router.post('/upload', protect, isAdmin, uploadFields, uploadController)

module.exports = router
