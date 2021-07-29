import React from 'react'
import { useParams } from 'react-router-dom'

import useOrderDetails from '../hooks/useOrderDetails'
import OrderDetails from '../components/order/OrderDetails'

const CustomerOrderDetails = () => {
    const { id } = useParams()

    const { order } = useOrderDetails({
        url: `/api/orders/${id}`,
    })

    return <OrderDetails order={order} goBackUrl="/me/orders" />
}

export default CustomerOrderDetails
