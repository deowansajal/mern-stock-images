const router = require('express').Router()

const {
    getAllImageController,
    downloadImageController,
} = require('../controllers/imageController')

const { protect } = require('../middleware/auth')

router.get('/', getAllImageController)

router.get('/download/:id', protect, downloadImageController)

module.exports = router
