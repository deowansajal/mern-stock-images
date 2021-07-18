import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import { Container, Table } from 'react-bootstrap'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import { Td, THeader } from '../components/table/Table'
import priceFormatter from '../components/utils/priceFormatter'

const isEqualArray = (arr1, arr2) =>
    JSON.stringify(arr1) === JSON.stringify(arr2)

const OrderItem = ({ order }) => {
    console.log(order)
    return (
        <tr>
            <Td>{order._id}</Td>
            <Td>{order.createdAt}</Td>
            <Td>{priceFormatter(order.totalPrice)}</Td>
            <Td>{order.paymentResult.status}</Td>
            <Td>Details</Td>
        </tr>
    )
}

const Order = () => {
    const [orders, setOrders] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const loadOrders = useCallback(async () => {
        const { data } = await axios.get('/api/orders')

        if (!isEqualArray(data.data.orders, orders)) {
            setOrders([...data.data.orders])
        }
    }, [orders])

    useEffect(() => {
        loadOrders().catch(err => {
            const { message } = err.response
            setErrorMessage(message)
        })
    }, [loadOrders])
    return (
        <ContainerWrapper>
            <Container>
                <h1 className="display-4 mb-5">My Orders</h1>
                <Table responsive>
                    <THeader titles={['Id', 'Date', 'Total', 'Status', '']} />
                    <tbody>
                        {orders.map(order => (
                            <OrderItem key={order.id} order={order} />
                        ))}
                    </tbody>
                </Table>
            </Container>
        </ContainerWrapper>
    )
}

export default Order
