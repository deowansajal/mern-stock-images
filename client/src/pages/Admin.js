import React from 'react'
import { Container } from 'react-bootstrap'

import ImageUpload from '../components/images/ImageUpload'

const Admin = () => {
    return (
        <Container className="mt-5">
            <div className="m-auto ">
                <ImageUpload />
            </div>
        </Container>
    )
}

export default Admin
