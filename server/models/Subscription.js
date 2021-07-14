const mongoose = require('mongoose')
const commonSchema = require('../utils/commonSchema')

const Subscription = new mongoose.Schema({
    sessionId: { ...commonSchema() },
    subscription: String,
    status: String,
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    customer: String,
    customerName: String,
    customerEmail: String,
    invoicePdf: String,
    isPaid: { type: Boolean, default: false },
    paymentStatus: String,
    paymentMethod: { type: String, required: true, enum: ['card'] },
    currentPeriodStart: { type: Number, required: true, default: 0 },
})

module.exports = mongoose.model('Subscription', Subscription)
