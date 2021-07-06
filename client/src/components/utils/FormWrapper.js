import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FormTitle = ({ title }) => (
    <h1 className="my-4 text-uppercase text-center">{title}</h1>
)

const FormLink = ({ to, text }) => (
    <p className="mt-4">
        <Link to={to} className="ml-2">
            {text}
        </Link>
    </p>
)
const FormWrapper = ({ title, to, linkText, children, isLoading }) => {
    return (
        <Container>
            <fieldset
                disabled={isLoading}
                style={{ minHeight: '70vh', maxWidth: '500px' }}
                className="d-flex m-auto "
            >
                <div className="m-auto w-100 ">
                    <Card className="mt-5">
                        <Card.Body>
                            <FormTitle title={title} />
                            {children}
                        </Card.Body>
                    </Card>
                    <FormLink to={to} text={linkText} />
                </div>
            </fieldset>
        </Container>
    )
}

export default FormWrapper
