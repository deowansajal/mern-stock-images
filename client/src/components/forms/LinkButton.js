import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton = ({ to, text, children }) => {
    return (
        <p className="mt-4">
            {children}
            <Link to={to} className="ml-2 font-weight-bold text-uppercase">
                {text}
            </Link>
        </p>
    )
}

export default LinkButton
