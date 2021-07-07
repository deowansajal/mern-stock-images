import React from 'react'
import { Form, Button } from 'react-bootstrap'

const ImageUpload = () => {
    return (
        <Form
            style={{ maxWidth: '300px', minHeight: '400px' }}
            className="d-flex m-auto"
        >
            <Form.Group className="m-auto w-100">
                <Form.File id="image" />
                <Button className="mt-4 text-uppercase w-100">
                    Upload Image
                </Button>
            </Form.Group>
        </Form>
    )
}

export default ImageUpload
