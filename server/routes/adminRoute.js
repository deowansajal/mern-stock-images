const router = require('express').Router()

const { uploadController } = require('../controllers/adminController')
const imageValidator = require('../middleware/imageValidator')
const uploadFields = require('../middleware/uploadFields')

router.post(
    '/upload',
    uploadFields,
    // (req, res, next) => {
    //     req.body = {
    //         ...req.body,
    //         ...req.file,
    //     }
    //     next()
    // },
    // imageValidator,
    uploadController
)

module.exports = router
