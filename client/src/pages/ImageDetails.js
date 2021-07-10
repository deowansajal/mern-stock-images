import { useContext } from 'react'
import { Image, Container, Row, Col, Button } from 'react-bootstrap'

import { ImagesContext } from '../context/images-context'

const ImageDetails = () => {
    const { currentImage } = useContext(ImagesContext)

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
                                    <h4>$40</h4>
                                    <p className="lead">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Velit perspiciatis quo
                                        blanditiis possimus
                                    </p>
                                    <div className="mt-5">
                                        <Button
                                            variant="outline-primary"
                                            className="w-100 mb-4 "
                                        >
                                            Add To Cart
                                        </Button>
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
