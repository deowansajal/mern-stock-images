import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Button, Container, Row, Col, Card, ButtonGroup } from 'react-bootstrap'
import { useStripe } from '@stripe/react-stripe-js'

import ContainerWrapper from '../components/utils/ContainerWrapper'
import isNotEqual from '../components/utils/isNotEqual'
import priceFormatter from '../components/utils/priceFormatter'

const PricingCard = ({ product, clickHandler }) => {
    const { name, description, price } = product
    return (
        <Col lg={4} md={6} className="mb-lg-0 mb-4">
            <Card>
                <Card.Header className="border-bottom-0 text-uppercase font-weight-bold bg-white">
                    {name}
                </Card.Header>
                <Card.Body>
                    <p>{description}</p>
                    <div className="d-flex align-items-center">
                        <h3 className="font-weight-bold">
                            {priceFormatter(price.unitAmount)}
                        </h3>
                        <span>/</span>
                        {
                            <sub className="font-weight-bold text-secondary">
                                {price.recurringInterval}
                            </sub>
                        }
                    </div>
                </Card.Body>
                <Card.Footer className="border-top-0 bg-white">
                    <Button
                        className="w-100 text-uppercase"
                        onClick={clickHandler.bind(null, price.id)}
                    >
                        Subscribe
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    )
}

const usePricing = () => {
    const [recurringProducts, setRecurringProducts] = useState([])
    const [recurringInterval, setRecurringInterval] = useState('month')

    const loadPricesList = useCallback(() => {
        axios
            .get(
                `/api/subscription/pricing?recurringInterval=${recurringInterval}`
            )
            .then(({ data }) => {
                if (
                    isNotEqual(recurringProducts, data.data.recurringProducts)
                ) {
                    setRecurringProducts(data.data.recurringProducts)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [recurringProducts, recurringInterval])

    useEffect(() => {
        loadPricesList()
    }, [loadPricesList])

    return { recurringProducts, recurringInterval, setRecurringInterval }
}

const PriceTextContent = price => (
    <div
        className="mb-5 text-center "
        style={{ maxWidth: 600, margin: 'auto' }}
    >
        <h1 className="display-4 font-weight-bold">Pricing Plans</h1>
        <p className="lead">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
        </p>
    </div>
)

const Pricing = () => {
    const { recurringProducts, recurringInterval, setRecurringInterval } =
        usePricing()
    const stripe = useStripe()
    const clickHandler = priceId => {
        axios
            .post(`/api/subscription?mode=subscription`, {
                data: {
                    priceId,
                },
            })
            .then(({ data }) => {
                stripe.redirectToCheckout({ sessionId: data.data.sessionId })
            })
    }

    return (
        <ContainerWrapper>
            <Container>
                <PriceTextContent />
                <div className="d-flex justify-content-center mb-5">
                    <ButtonGroup>
                        <Button
                            onClick={() => setRecurringInterval('month')}
                            variant={
                                recurringInterval === 'month'
                                    ? 'secondary'
                                    : 'outline-secondary'
                            }
                        >
                            Monthly Billing
                        </Button>
                        <Button
                            onClick={() => setRecurringInterval('year')}
                            variant={
                                recurringInterval === 'year'
                                    ? 'secondary'
                                    : 'outline-secondary'
                            }
                        >
                            Yearly Billing
                        </Button>
                    </ButtonGroup>
                </div>
                <Row>
                    {recurringProducts.length > 0 &&
                        recurringProducts.map(product => (
                            <PricingCard
                                key={product.productId}
                                product={product}
                                clickHandler={clickHandler}
                            />
                        ))}
                </Row>
            </Container>
        </ContainerWrapper>
    )
}

export default Pricing
