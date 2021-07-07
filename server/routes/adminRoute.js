const router = require('express').Router()

const { uploadController } = require('../controllers/adminController')
const imageValidator = require('../middleware/imageValidator')
const uploadFields = require('../middleware/uploadFields')

router.post('/upload', uploadFields, uploadController)

module.exports = router
