import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Image, Container, Row, Col, Button } from 'react-bootstrap'

import { ImagesContext } from '../context/images-context'
import { CartContext } from '../context/cart-context'
import priceFormatter from '../components/utils/priceFormatter'

const ImageDetails = () => {
    const { currentImage } = useContext(ImagesContext)
    const { addToCart, cart } = useContext(CartContext)

    const hasInCart = cart.items.some(item => item.id === currentImage.id)

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} md={12} lg={7} className="my-5 p-3 border">
                    <div className="d-flex justify-content-center">
                        <Image
                            fluid
                            src={`/uploads/${currentImage.thumbnail}`}
                            alt={`${currentImage.name}`}
                        />
                    </div>
                </Col>
                <Col
                    sm={12}
                    md={12}
                    lg={{ span: 5, offset: 0 }}
                    className=" my-lg-5 my-0 "
                    style={{ maxHeight: 400 }}
                >
                    <div className="d-flex h-100 ">
                        <div className="m-auto">
                            <div className="px-4 border ml-4">
                                <div className="mt-5  mt-sm-0 py-sm-4 ">
                                    <p className="text-uppercase">
                                        {currentImage.name}
                                    </p>
                                    <h4>
                                        {priceFormatter(currentImage.price)}
                                    </h4>
                                    <p className="lead">{currentImage.name}</p>
                                    <div className="mt-5">
                                        {!hasInCart && (
                                            <Button
                                                onClick={e =>
                                                    addToCart(currentImage)
                                                }
                                                variant="outline-primary"
                                                className="w-100 mb-4 "
                                            >
                                                Add to Cart
                                            </Button>
                                        )}

                                        {hasInCart && (
                                            <Link to="/cart">
                                                <Button
                                                    variant="outline-primary"
                                                    className="w-100 mb-4 "
                                                >
                                                    Go to Cart
                                                </Button>
                                            </Link>
                                        )}
                                        <Button
                                            className="w-100 "
                                            variant="danger"
                                        >
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ImageDetails
