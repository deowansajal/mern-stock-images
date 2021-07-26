import React from 'react'

import { Container, Table, Button } from 'react-bootstrap'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import { Td, THeader } from '../components/table/Table'
import priceFormatter from '../components/utils/priceFormatter'
import timeFormatter from '../components/utils/timeFormatter'

import useOrder from '../hooks/useOrder'
import Subscription from '../components/subscription/Subscription'

const OrderItem = ({ order }) => {
    return (
        <tr>
            <Td>{order._id}</Td>
            <Td>{timeFormatter(order.createdAt)}</Td>
            <Td>{priceFormatter(order.totalPrice)}</Td>
            <Td>{order.payment.status}</Td>
            <Td>
                <Subscription order={order} />
            </Td>
            <Td>
                <Button size="sm" variant="outline-secondary">
                    Details
                </Button>
            </Td>
        </tr>
    )
}

const Order = () => {
    const { orders } = useOrder()
    return (
        <ContainerWrapper>
            <Container fluid="md">
                {orders.length === 0 && (
                    <p className="lead text-center">You have no Order</p>
                )}
                {orders.length > 0 && (
                    <>
                        <h1 className="display-4 mb-5">My Orders</h1>
                        <Table responsive>
                            <THeader
                                titles={[
                                    'Id',
                                    'Date',
                                    'Total',
                                    'Status',
                                    'Subscription',
                                    '',
                                ]}
                            />
                            <tbody>
                                {orders.map(order => (
                                    <OrderItem key={order._id} order={order} />
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </Container>
        </ContainerWrapper>
    )
}

export default Order
