import { useContext, useState } from 'react'
import classNames from 'classnames'
import { useStripe } from '@stripe/react-stripe-js'

import {
    Image,
    Container,
    Table,
    Row,
    Col,
    Button,
    ListGroup,
} from 'react-bootstrap'

import Icon from '../components/utils/Icon'
import { ImagesContext } from '../context/images-context'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import { AuthContext } from '../context/auth-context'
import AuthModal from '../components/modal/AuthModal'

import useHttp from '../hooks/useHttp'
import axios from 'axios'

const Th = ({ className, children, ...props }) => {
    const classes = classNames({
        [className]: classNames,
        'border-bottom-0': true,
    })

    return (
        <th {...props} className={classes}>
            {children ? children : null}
        </th>
    )
}
const Td = ({ className, children, ...props }) => {
    const classes = classNames({
        [className]: classNames,
        'border-bottom-0': true,
    })

    return (
        <td {...props} className={classes}>
            {children ? children : null}
        </td>
    )
}

const tdStyle = {
    verticalAlign: 'middle',
}

const CartCheckoutButton = ({
    isAuthenticated,
    modalOpenHandler,
    checkoutSubmitHandler,
}) => {
    if (!isAuthenticated) {
        return (
            <Button
                onClick={modalOpenHandler}
                className="w-100 text-uppercase mt-4"
            >
                Proceed to checkout
            </Button>
        )
    }
    return (
        <Button
            onClick={checkoutSubmitHandler}
            className="w-100 text-uppercase mt-4"
        >
            Proceed to checkout
        </Button>
    )
}

const Cart = () => {
    const { currentImage } = useContext(ImagesContext)
    const { isAuthenticated } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const sendHttpRequest = useHttp()

    const stripe = useStripe()

    const modalOpenHandler = e => {
        if (!isAuthenticated) {
            setIsOpen(true)
        }
    }
    const modalCloseHandler = e => {
        setIsOpen(false)
    }

    const checkoutSubmitHandler = e => {
        axios
            .post('/api/order/create-checkout-session', {
                data: {
                    items: [
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: 'Stubborn Attachments',
                                    images: ['https://i.imgur.com/EHyR2nP.png'],
                                },
                                unit_amount: 2000,
                            },
                            quantity: 1,
                        },
                    ],
                },
            })
            .then(({ data }) => {
                return stripe.redirectToCheckout({ sessionId: data.sessionId })
            })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <>
            {!isAuthenticated && (
                <AuthModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onClose={modalCloseHandler}
                />
            )}

            <ContainerWrapper>
                <Container>
                    <Row>
                        <Col lg={7}>
                            <Table responsive>
                                <thead className="border-bottom-0">
                                    <tr>
                                        <Th>Image and name</Th>
                                        <Th>price</Th>
                                        <Th></Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <tr>
                                            <Td style={tdStyle}>
                                                <div
                                                    style={{
                                                        maxWidth: '120px',
                                                    }}
                                                >
                                                    <Image
                                                        fluid
                                                        src={`/uploads/${currentImage.thumbnail}`}
                                                        alt=""
                                                    />
                                                </div>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Dolor, non.
                                            </Td>
                                            <Td style={tdStyle}>22</Td>
                                            <Td style={tdStyle}>
                                                <Icon
                                                    name="close"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </Td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        <Col lg={5}>
                            <ListGroup>
                                <ListGroup.Item className="d-flex justify-content-between border-bottom-0">
                                    <span>Subtotal</span>
                                    <span>399</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between border-bottom-0">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between ">
                                    <span>Total</span>
                                    <span>399</span>
                                </ListGroup.Item>
                            </ListGroup>

                            <CartCheckoutButton
                                isAuthenticated={isAuthenticated}
                                modalOpenHandler={modalOpenHandler}
                                checkoutSubmitHandler={checkoutSubmitHandler}
                            />
                        </Col>
                    </Row>
                </Container>
            </ContainerWrapper>
        </>
    )
}

export default Cart
