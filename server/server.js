const fs = require('fs')
require('dotenv').config({ path: './config/config.env' })
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const routes = require('./routes/routes')
const axios = require('axios')

const logMessage = require('./utils/logMessage')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 4000

const { upload, getFileStream } = require('./middleware/uploadFile')

app.post(
    '/api/upload',
    upload.single('image'),
    async function (req, res, next) {
        try {
            return res.status(200).json({
                reqFile: req.file,
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error })
        }
    }
)

app.get('/api/download', async (req, res, next) => {
    const { fileStream, url } = getFileStream(
        '1625566658742Solid Color Fleece Hooded Long Sleeve Thick Coat For Women.jpg'
    )

    res.json({ message: 'success', url })
    // res.sendFile(stream)
})
// Routes
routes(app)

app.use((err, req, res, next) => {
    const { message, error, statusCode, success } = err
    res.status(statusCode).json({
        success,
        statusCode,
        message,
        error,
    })
})

connectDB().then(() => {
    app.listen(PORT, () => {
        logMessage.success(`App listening on port ${PORT}...`)
    })
})
