import React from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const GoToShopButton = ({ text, children, className, ...props }) => {
    const classes = classNames({
        [className]: className,
    })

    return (
        <Link to="/">
            <Button {...props} className={classes}>
                {text ? text : children}
            </Button>
        </Link>
    )
}

export default GoToShopButton
