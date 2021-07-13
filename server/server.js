require('dotenv').config({ path: './config/config.env' })
const path = require('path')
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const routes = require('./routes/routes')
const stripe = require('stripe')

const logMessage = require('./utils/logMessage')
const webhookController = require('./controllers/webhookController')
const app = express()
// app.use('/webhook', express.raw({ type: '*/*' }))

app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next()
    } else {
        express.json()(req, res, next)
    }
})

app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 4000

// Routes
routes(app)

// Initialize webhook route
app.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    webhookController
)

app.use((err, req, res, next) => {
    const { message, error, statusCode = 500, success } = err

    if (statusCode === 500 || statusCode > 500) {
        console.log(err.message)
        return res.status(statusCode).json({ message: 'An error occurred' })
    }

    console.log(message, error)

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
