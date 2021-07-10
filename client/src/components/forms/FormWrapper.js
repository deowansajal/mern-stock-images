import React from 'react'
import { Container } from 'react-bootstrap'

const FormWrapper = ({ isLoading, children, isCheckout }) => {
    return (
        <Container
            style={{
                maxWidth: '500px',
                marginTop: !isCheckout ? '5rem' : 'marginTop: 0',
            }}
        >
            <fieldset disabled={isLoading}>
                <div className="m-auto w-100 h-100">{children}</div>
            </fieldset>
        </Container>
    )
}

export default FormWrapper
