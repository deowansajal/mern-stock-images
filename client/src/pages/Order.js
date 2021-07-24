import React from 'react'

import { Container, Table, Button, OverlayTrigger } from 'react-bootstrap'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import { Td, THeader } from '../components/table/Table'
import priceFormatter from '../components/utils/priceFormatter'
import timeFormatter from '../components/utils/timeFormatter'

import SubscriptionPopover from '../components/subscription/SubscriptionPopover'
import useSubscription from '../hooks/useSubscription'
import useOrder from '../hooks/useOrder'

const OrderItem = ({ order, recurringProducts, subscribeHandler }) => {
    return (
        <tr>
            <Td>{order._id}</Td>
            <Td>{timeFormatter(order.createdAt)}</Td>
            <Td>{priceFormatter(order.totalPrice)}</Td>
            <Td>{order.payment.status}</Td>
            <Td>
                <Button variant="outline-secondary">Details</Button>
            </Td>
            <Td>
                {recurringProducts.map(product => (
                    <OverlayTrigger
                        key={product.productId}
                        trigger={['hover', 'focus']}
                        placement="top"
                        overlay={<SubscriptionPopover product={product} />}
                    >
                        <Button
                            variant="secondary"
                            className="mx-2 mb-2 mb-lg-0"
                            onClick={subscribeHandler.bind(
                                null,
                                product.price.id
                            )}
                        >
                            {product.name}
                        </Button>
                    </OverlayTrigger>
                ))}
            </Td>
        </tr>
    )
}

const Order = () => {
    const { orders } = useOrder()
    const { recurringProducts, subscribeHandler } = useSubscription()

    return (
        <ContainerWrapper>
            <Container fluid="md">
                {orders.length <= 0 && (
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
                                    '',
                                    'Subscription',
                                ]}
                            />
                            <tbody>
                                {orders.reverse().map(order => (
                                    <OrderItem
                                        key={order._id}
                                        order={order}
                                        subscribeHandler={subscribeHandler}
                                        recurringProducts={recurringProducts}
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
