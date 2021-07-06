var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

var s3 = new aws.S3({ region, accessKeyId, secretAccessKey })

exports.upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            console.log(file.fieldname)
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname)
        },
    }),
})

// downloads a file from s3
exports.getFileStream = fileKey => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    }

    const url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: fileKey,
        Expires: 60 * 1000,
    })

    // return url
    return { stream: s3.getObject(downloadParams).createReadStream(), url, url }
}

// Testing purpose

// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
// const fs = require('fs')
// const S3 = require('aws-sdk/clients/s3')

// const s3 = new S3({
//     region,
//     accessKeyId,
//     secretAccessKey,
// })

// // uploads a file to s3
// function uploadFile(file) {
//     const fileStream = fs.createReadStream(file.path)

//     const uploadParams = {
//         Bucket: bucketName,
//         Body: fileStream,
//         Key: file.filename,
//     }

//     return s3.upload(uploadParams).promise()
// }

// // downloads a file from s3
// function getFileStream(fileKey) {
//     const downloadParams = {
//         Key: fileKey,
//         Bucket: bucketName,
//     }

//     return s3.getObject(downloadParams).createReadStream()
// }

// app.post('/api/upload', upload.single('image'), async (req, res) => {
//     const file = req.file
//     console.log(file)

//     // apply filter
//     // resize

//     const result = await uploadFile(file)
//     // await unlinkFile(file.path)
//     console.log(result)
//     // const description = req.body.description
//     res.send({ imagePath: `/images/${result.Key}` })
// })

// Testing purpose end
