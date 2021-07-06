const router = require('express').Router()

const { uploadController } = require('../controllers/adminController')
const imageValidator = require('../middleware/imageValidator')
const upload = require('../middleware/upload')

router.post(
    '/upload',
    upload.single('image'),
    (req, res, next) => {
        req.body = {
            ...req.body,
            ...req.file,
        }
        next()
    },
    imageValidator,
    uploadController
)

module.exports = router
