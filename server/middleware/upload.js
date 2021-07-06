var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

var s3 = new aws.S3({ region, accessKeyId, secretAccessKey })

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname)
        },
    }),
})
module.exports = upload
// Generate signature
// exports.sendSignedUrl = fileKey => {
//     const url = s3.getSignedUrl('getObject', {
//         Bucket: bucketName,
//         Key: fileKey,
//         Expires: 60 * 1000,
//     })
// }
