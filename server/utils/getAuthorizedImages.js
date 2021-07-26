const Order = require('../models/Order')

const getAuthorizedImages = async req => {
    const orders = await Order.find({
        user: req.user._id,
    })
    // .populate({
    //     path: 'subscription',
    //     select: '-_id',
    //     match: {
    //         status: 'active',
    //     },
    // })

    const filterOrders = orders.filter(order => {
        // if (order.mode === 'subscription' && order.subscription) {
        //     return order
        // }
        if (order.payment.status === 'paid') {
            order.orderItems = order.orderItems.filter(item => {
                if (!item.isUpdated) {
                    return item
                }
            })
            return order
        }
    })

    const images = filterOrders
        .reduce((acc, order) => {
            return acc.concat(order.orderItems)
        }, [])
        .map(image => image.id)

    return images
}

module.exports = getAuthorizedImages
