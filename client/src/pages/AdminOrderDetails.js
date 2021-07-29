import React from 'react'
import { useParams } from 'react-router-dom'

import useOrderDetails from '../hooks/useOrderDetails'
import OrderDetails from '../components/order/OrderDetails'

const AdminOrderDetails = () => {
    const { order: orderId, id: customerId } = useParams()
    const { order } = useOrderDetails({
        url: `/api/admin/customers/${customerId}/${orderId}`,
    })

    return <OrderDetails order={order} goBackUrl={`/customers/${customerId}`} />
}

export default AdminOrderDetails
