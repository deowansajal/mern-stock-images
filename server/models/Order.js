const mongoose = require('mongoose')

const commonSchema = require('../utils/commonSchema')

const orderSchema = mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        orderItems: [
            {
                price: {
                    type: [Number, 'Price Should be number'],
                    required: [true, 'Price is required'],
                },
                quantity: {
                    type: [Number, 'Quantity Should be number'],
                    required: [true, 'Price is required'],
                },
                name: {
                    type: [String, 'Name Should be string'],
                    required: [true, 'Name is required'],
                    trim: true,
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

        paymentMode: {
            type: String,
            enum: ['payment', 'subscription'],
            required: true,
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

const Order = mongoose.model('Order', orderSchema)

export default Order
