const Order = require('../models/Order')

const getAuthorizedImages = async req => {
    const orders = await Order.find({
        user: req.user._id,
        'payment.status': 'paid',
    }).populate({
        path: 'subscription',
        select: 'status',
        match: {
            status: 'active',
        },
    })

    const images = orders
        .reduce((acc, order) => {
            return acc.concat(order.orderItems)
        }, [])
        .map(image => image.id)

    return images
}

module.exports = getAuthorizedImages
