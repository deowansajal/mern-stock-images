import React from 'react'
import { Table, Container, Button, ListGroup, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { THeader, Td } from '../components/table/Table'
import useCustomer from '../hooks/useCustomer'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import GoBackButton from '../components/buttons/GoBackButton'
import timeFormatter from '../components/utils/timeFormatter'
import priceFormatter from '../components/utils/priceFormatter'

const CustomerDetails = () => {
    const { id } = useParams()

    const { customer, orders, user } = useCustomer(id)

    return (
        <ContainerWrapper>
            <Container>
                <GoBackButton to="/customers" />

                <Row>
                    <Col lg={{ span: 5 }}>
                        <h2 className="text-uppercase mb-4">Customer</h2>
                        <div className="border-bottom mb-5">
                            {Object.keys(customer).map(field => (
                                <p className="lead" key={field}>
                                    <strong>
                                        {field} : {customer[field]}{' '}
                                    </strong>
                                </p>
                            ))}
                        </div>
                    </Col>
                    <Col lg={{ span: 5, offset: 2 }}>
                        <h2 className="text-uppercase mb-4">User</h2>
                        <div className="border-bottom mb-5">
                            {Object.keys(user).map(field => (
                                <p className="lead" key={field}>
                                    <strong>
                                        {field} : {user[field]}{' '}
                                    </strong>
                                </p>
                            ))}
                        </div>
                    </Col>
                </Row>

                <div className="mt-5">
                    <h2 className="text-uppercase mb-4">Orders </h2>
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
                            {orders.length > 0 &&
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <Td>{order._id}</Td>
                                        <Td>
                                            {timeFormatter(order.createdAt)}
                                        </Td>
                                        <Td>
                                            {priceFormatter(order.totalPrice)}
                                        </Td>

                                        <Td>{order.payment.status}</Td>
                                        <Td>
                                            {order.subscription &&
                                                order.subscription.status}
                                            {!order.subscription && 'N/A'}
                                        </Td>

                                        <Td>
                                            <Button variant="outline-primary">
                                                Details
                                            </Button>
                                        </Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </ContainerWrapper>
    )
}

export default CustomerDetails
