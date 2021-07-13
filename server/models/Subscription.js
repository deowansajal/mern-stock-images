const mongoose = require('mongoose')
const commonSchema = require('../utils/commonSchema')

const Subscription = new mongoose.Schema({
    id: { ...commonSchema() },
    subscription: String,
    status: String,
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    customerId: String,
    customerEmail: String,
    invoicePdf: String,
    paymentStatus: String,
    invoiceStatus: String,
    paymentIntentStatus: { type: Boolean, required: true, default: false },
    paymentMethod: { type: String, required: true, enum: ['card'] },
    currentPeriodStart: { type: Number, required: true, default: 0 },
    currentPeriodEnd: { type: Number, required: true, default: 0 },
})

module.exports = mongoose.model('Subscription', Subscription)
