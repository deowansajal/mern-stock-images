const mongoose = require('mongoose')

const commonSchema = require('../utils/commonSchema')

const OrderSchema = mongoose.Schema(
    {
        sessionId: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        orderItems: [
            {
                _id: false,
                id: { type: String, required: true },
                thumbnail: { type: String, required: true },
                isUpdated: {
                    type: Boolean,
                    required: true,
                    default: false,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                name: {
                    type: String,
                    required: true,
                },
            },
        ],

        customer: {
            id: String,
            name: String,
            email: String,
        },

        mode: {
            type: String,
            required: true,
            enum: ['payment', 'subscription'],
        },
        payment: {
            status: { type: String, required: true, default: 'unpaid' },
            method: String,
        },
        paidAt: Date,
        subscription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription',
        },

        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Order', OrderSchema)
