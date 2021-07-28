import React from 'react'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'

const FormControlGroup = ({
    type = 'text',
    name,
    controlId,
    value = '',
    label,
    isInvalid,
    feedback,
    onChange,
    children,
    ...props
}) => {
    return (
        <FormGroup className="mb-3" controlId={controlId}>
            <FormLabel>{label}</FormLabel>
            <FormControl
                {...props}
                onChange={onChange}
                type={type}
                name={name}
                value={value}
                isInvalid={isInvalid}
            >
                {children ? children : null}
            </FormControl>
            {isInvalid && (
                <FormControl.Feedback type="invalid">
                    {feedback}
                </FormControl.Feedback>
            )}
        </FormGroup>
    )
}

export default FormControlGroup
