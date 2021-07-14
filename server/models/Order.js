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
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
            },
        ],

        paymentMethod: {
            type: String,
            required: true,
        },

        paymentResult: {
            id: { type: String },
            status: { type: String },
            updateTime: { type: String },
            emailAddress: { type: String },
        },

        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },

        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },

        invoice: {
            status: String,
            id: String,
            pdf: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Order', OrderSchema)
