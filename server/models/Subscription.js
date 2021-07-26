const mongoose = require('mongoose')

const Subscription = new mongoose.Schema({
    id: String,
    sessionId: {
        type: String,
        required: true,
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order',
    },

    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

    status: { type: String, required: true, default: 'incomplete' },

    payment: {
        status: { type: String, required: true, default: 'unpaid' },
        method: String,
    },

    plan: {
        name: String,
        productId: String,
        priceId: { type: String, required: true },
    },

    customer: {
        id: String,
        name: String,
        email: String,
    },

    invoice: {
        id: String,
        status: String,
        pdf: String,
    },
})

module.exports = mongoose.model('Subscription', Subscription)
