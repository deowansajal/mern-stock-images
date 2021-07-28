import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    ListGroup,
    Table,
    Image,
    Button,
} from 'react-bootstrap'
import axios from 'axios'

import ContainerWrapper from '../components/utils/ContainerWrapper'
import priceFormatter from '../components/utils/priceFormatter'
import { THeader, Td } from '../components/table/Table'

const SubscriptionDetails = ({ subscription }) => {
    return (
        <Row className="mt-5">
            <Col>
                <ListGroup>
                    <ListGroup.Item className="border-0">
                        <h2>SUBSCRIPTION</h2>
                    </ListGroup.Item>
                    <ListGroup.Item className=" border border-right-0 border-left-0">
                        <p>
                            Product :{' '}
                            <strong>{subscription.details.productName}</strong>
                        </p>
                        <p>
                            Plan :{' '}
                            <strong>
                                {priceFormatter(subscription.details.price)}
                            </strong>
                            <small>/ {subscription.details.interval}</small>
                        </p>
                        <p>
                            Status : <strong>{subscription.status}</strong>
                        </p>
                        <a href={`${subscription.details.invoicePdf}`}>
                            <Button>Download Invoice</Button>
                        </a>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}

const OrderDetails = () => {
    const [order, setOrder] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source()

        axios({
            url: `/api/orders/${id}`,
            cancelToken: cancelTokenSource.token,
        }).then(({ data }) => {
            setOrder(data.data.order)
        })

        return cancelTokenSource.cancel
    }, [id])

    return (
        <ContainerWrapper>
            <Container>
                {!order && <p>No Order Found</p>}

                {order && (
                    <Row>
                        <Col lg={8}>
                            <ListGroup>
                                <ListGroup.Item className="border-0">
                                    <h2>
                                        <span>ORDER</span> {order._id}
                                    </h2>
                                </ListGroup.Item>
                                <ListGroup.Item className="mt-5 border border-right-0 border-left-0">
                                    <h3 className="mb-3">PAYMENT</h3>
                                    <p>Method : {order.payment.method}</p>
                                    <p>Status : {order.payment.status}</p>
                                    <p>
                                        Paid at:{' '}
                                        {new Date(
                                            order.paidAt
                                        ).toLocaleString()}{' '}
                                    </p>
                                </ListGroup.Item>
                            </ListGroup>
                            <div className="mt-5">
                                <Table>
                                    <THeader
                                        titles={['ODER ITEMS', '']}
                                        thStyle={{
                                            fontSize: '1.6rem',
                                            fontWeight: '500',
                                        }}
                                    />
                                    <tbody>
                                        {order.orderItems.map(item => (
                                            <tr key={item.id}>
                                                <Td>
                                                    <Image
                                                        width="120"
                                                        src={`/uploads/${item.thumbnail}`}
                                                    />
                                                    <span className="ml-3">
                                                        {item.name}
                                                    </span>
                                                </Td>
                                                <Td>
                                                    {priceFormatter(item.price)}{' '}
                                                    x {item.quantity} ={' '}
                                                    {priceFormatter(item.price)}
                                                </Td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h4 className="text-uppercase mb-0 ">
                                        Order Summary
                                    </h4>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between border-bottom-0">
                                    <span>Subtotal</span>
                                    <span>
                                        {priceFormatter(order.totalPrice)}
                                    </span>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex justify-content-between ">
                                    <span>Total</span>
                                    <span>
                                        {priceFormatter(order.totalPrice)}
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                )}

                {order && order.subscription && (
                    <SubscriptionDetails subscription={order.subscription} />
                )}
            </Container>
        </ContainerWrapper>
    )
}

export default OrderDetails
