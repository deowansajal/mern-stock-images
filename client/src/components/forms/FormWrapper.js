import React from 'react'
import { Container } from 'react-bootstrap'

const FormWrapper = ({ isLoading, children }) => {
    return (
        <Container style={{ maxWidth: '500px', marginTop: '5rem' }}>
            <fieldset disabled={isLoading}>
                <div className="m-auto w-100 h-100">{children}</div>
            </fieldset>
        </Container>
    )
}

export default FormWrapper
