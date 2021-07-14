const mongoose = require('mongoose')
const commonSchema = require('../utils/commonSchema')

const Customer = new mongoose.Schema({
    sessionId: { ...commonSchema() },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    id: String,
    email: String,
    paymentStatus: String,
    paymentMethod: { type: String, required: true, enum: ['card'] },
    subscriptions: {
        subscribed: { type: Boolean, default: false },
        id: String,
        status: String,
        invoicePdf: String,
        isPaid: { type: Boolean, default: false },
        currentPeriodStart: { type: Number, required: true, default: 0 },
    },

    orders: [
        { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
    ],
})

module.exports = mongoose.model('Customer', Customer)
