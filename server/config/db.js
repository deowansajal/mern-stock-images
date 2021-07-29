const mongoose = require('mongoose')
const logMessage = require('../utils/logMessage')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        logMessage.success(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        logMessage.error(error.message)
        logMessage.error('Database connection failed...')
        process.exit(1)
    }
}

module.exports = connectDB
