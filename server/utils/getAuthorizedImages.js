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

    const filterOrders = orders.filter(order => {
        if (order.subscription) {
            return order
        }

        order.orderItems = order.orderItems.filter(item => {
            if (!item.isUpdated) {
                return item
            }
        })
        return order
    })

    const images = filterOrders
        .reduce((acc, order) => {
            return acc.concat(order.orderItems)
        }, [])
        .map(image => image.id)

    return images
}

module.exports = getAuthorizedImages
