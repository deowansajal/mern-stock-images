import React from 'react'
import { Container, Row, Col, ListGroup, Table } from 'react-bootstrap'
import CartItem from '../components/cart/CartItem'
import ContainerWrapper from '../components/utils/ContainerWrapper'

import priceFormatter from '../components/utils/priceFormatter'
import { THeader, Th, Td } from '../components/table/Table'

const cart = {
    cartSubtotal: 19300,
}

const OrderDetails = () => {
    return (
        <ContainerWrapper>
            <Container>
                <Row>
                    <Col lg={8}>
                        <ListGroup>
                            <ListGroup.Item className="border-0">
                                <h2>
                                    <span>ORDER</span> 60ffe7bf93a93a11a0f855d5
                                </h2>
                            </ListGroup.Item>
                            <ListGroup.Item className="mt-5 border border-right-0 border-left-0">
                                <h3 className="mb-3">PAYMENT</h3>
                                <p>Method : Card</p>
                                <p>Status : Paid</p>
                                <p>Paid at: {Date()} </p>
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
                                    <tr>
                                        <Td>image</Td>
                                        <Td>price</Td>
                                    </tr>
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
                                <span>{priceFormatter(cart.cartSubtotal)}</span>
                            </ListGroup.Item>

                            <ListGroup.Item className="d-flex justify-content-between ">
                                <span>Total</span>
                                <span>{priceFormatter(cart.cartSubtotal)}</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </ContainerWrapper>
    )
}

export default OrderDetails
