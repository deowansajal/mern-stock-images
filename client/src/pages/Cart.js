import { useContext, useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js'

import { Container, Table, Row, Col, Button, ListGroup } from 'react-bootstrap'

import { CartContext } from '../context/cart-context'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import { AuthContext } from '../context/auth-context'
import AuthModal from '../components/modal/AuthModal'

import useHttp from '../hooks/useHttp'

import axios from 'axios'
import CartItem from '../components/cart/CartItem'
import { THeader } from '../components/table/Table'
import { Link } from 'react-router-dom'
import priceFormatter from '../components/utils/priceFormatter'

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
    const { cart, removeFromCart } = useContext(CartContext)
    const { isAuthenticated } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

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
            .post('/api/orders', {
                orderItems: cart.items,
            })
            .then(({ data }) => {
                console.log(data)
                return stripe.redirectToCheckout({ sessionId: data.sessionId })
            })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    let cartJsx = (
        <div className="text-center">
            <p className="lead mb-5">There is no item in cart</p>
            <Link to="/">
                <Button>Go to Shop</Button>
            </Link>
        </div>
    )

    if (cart.items.length > 0) {
        cartJsx = (
            <Row>
                <Col lg={8}>
                    <Table responsive>
                        <THeader titles={['Image and Name', 'Price', '']} />
                        <tbody>
                            {cart.items.map(item => (
                                <CartItem
                                    key={item.id}
                                    removeFromCart={removeFromCart}
                                    cartItem={item}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col lg={4}>
                    <ListGroup>
                        <ListGroup.Item className="d-flex justify-content-between border-bottom-0">
                            <span>Subtotal</span>
                            <span>{priceFormatter(cart.cartSubtotal)}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between border-bottom-0">
                            <span>Shipping</span>
                            <span>Free</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between ">
                            <span>Total</span>
                            <span>{priceFormatter(cart.cartSubtotal)}</span>
                        </ListGroup.Item>
                    </ListGroup>

                    <CartCheckoutButton
                        isAuthenticated={isAuthenticated}
                        modalOpenHandler={modalOpenHandler}
                        checkoutSubmitHandler={checkoutSubmitHandler}
                    />
                </Col>
            </Row>
        )
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
                <Container>{cartJsx}</Container>
            </ContainerWrapper>
        </>
    )
}

export default Cart
