import React from 'react'

const FormTitle = ({ className, title, ...props }) => {
    return (
        <h1
            {...props}
            className={`my-4 text-uppercase text-center ${
                className ? className : ''
            }`}
        >
            {title}
        </h1>
    )
}

export default FormTitle
