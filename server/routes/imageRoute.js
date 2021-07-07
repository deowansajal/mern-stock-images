const router = require('express').Router()

const { getAllImageController } = require('../controllers/imageController')

router.get('/', getAllImageController)

module.exports = router
