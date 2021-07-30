import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Table, Button, ButtonGroup } from 'react-bootstrap'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import { Td, THeader } from '../components/table/Table'
import priceFormatter from '../components/utils/priceFormatter'
import timeFormatter from '../components/utils/timeFormatter'
import Icon from '../components/utils/Icon'
import useOrder from '../hooks/useOrder'
import Subscription from '../components/subscription/Subscription'

const OrderItem = ({ order, orderRefreshHandler }) => {
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
                <Link to={`/me/orders/${order._id}`}>
                    <Button size="sm" variant="outline-secondary">
                        Details
                    </Button>
                </Link>
                <Button
                    onClick={orderRefreshHandler.bind(null, order._id)}
                    size="sm"
                    variant="outline-danger ml-3"
                >
                    <Icon name="refresh" />
                </Button>
            </Td>
        </tr>
    )
}

const Order = () => {
    const { orders, setOrderId, orderRefreshHandler } = useOrder()
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
                                    <OrderItem
                                        key={order._id}
                                        order={order}
                                        setOrderId={setOrderId}
                                        orderRefreshHandler={
                                            orderRefreshHandler
                                        }
                                    />
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
