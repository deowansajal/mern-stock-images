import React from 'react'
import { Button } from 'react-bootstrap'

const SubmitButton = ({ children, ...props }) => {
    return (
        <Button
            {...props}
            variant="primary"
            type="submit"
            className="text-uppercase  w-100 my-3"
        >
            {children}
        </Button>
    )
}

export default SubmitButton
