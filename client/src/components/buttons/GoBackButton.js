import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import classNames from 'classnames'

import Icon from '../utils/Icon'

import React from 'react'

const GoBackButton = ({ to, className, ...props }) => {
    const classes = classNames({
        'd-flex mb-5': true,
        [className]: className,
    })
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <Button variant="outline-primary" className={classes}>
                <Icon name="keyboard_backspace" />
                <span className="ml-3">Go Back</span>
            </Button>
        </Link>
    )
}

export default GoBackButton
