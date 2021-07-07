const path = require('path')
const multer = require('multer')

const generateFilename = file => {
    return (
        path.basename(file.originalname, path.extname(file.originalname)) +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    )
}
const des = path.join(__dirname, '..', 'public', 'uploads')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, generateFilename(file))
    },
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        cb(null, true)
    },
})

const uploadFields = upload.fields([
    { name: 'main', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
])

module.exports = uploadFields

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: bucketName,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname })
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString() + file.originalname)
//         },
//     }),
// })
