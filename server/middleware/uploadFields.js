const multer = require('multer')

const imageNameGenerator = require('../utils/imageNameGenerator')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, imageNameGenerator(file))
    },
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        cb(null, true)
    },
})

const uploadFields = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
])

module.exports = uploadFields
