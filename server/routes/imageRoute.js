const router = require('express').Router()

const {
    getAllImageController,
    getImageByIdController,
} = require('../controllers/imageController')

router.get('/', getAllImageController)
router.get('/:id', getImageByIdController)

module.exports = router
