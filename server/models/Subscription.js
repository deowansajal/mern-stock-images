const mongoose = require('mongoose')
const commonSchema = require('../utils/commonSchema')

const Subscription = new mongoose.Schema({
    sessionId: { ...commonSchema() },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    id: String,
    status: { type: String, required: true, default: 'incomplete' },

    // payment: {
    //     status: { type: String, required: true, default: 'unpaid' },
    //     method: String,
    // },

    // plan: {
    //     productId: String,
    //     priceId: { type: String, required: true },
    // },

    // customer: {
    //     id: String,
    //     name: String,
    //     email: String,
    // },

    invoice: {
        pdf: String,
        paid: { type: Boolean, default: false },
        status: { type: String, default: 'draft' },
    },
})

module.exports = mongoose.model('Subscription', Subscription)
