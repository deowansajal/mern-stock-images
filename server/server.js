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
