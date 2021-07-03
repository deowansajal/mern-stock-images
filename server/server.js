require('dotenv').config({ path: './config/config.env' })

const express = require('express')
const connectDB = require('./config/db')
const routes = require('./routes/routes')
const logMessage = require('./utils/logMessage')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 4000

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the server...' })
})

// All the applications routes
routes(app)

app.use((err, req, res, next) => {
    const { message, data, statusCode, success } = err
    res.json({
        success,
        statusCode,
        message,
        data,
    })
})

connectDB().then(() => {
    app.listen(PORT, () => {
        logMessage.success(`App listening on port ${PORT}...`)
    })
})
