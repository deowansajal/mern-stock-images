import React from 'react'
import classNames from 'classnames'

const Icon = ({ className, children, name, ...props }) => {
    const classes = classNames({
        'material-icons-outlined': true,
        [className]: className,
    })
    return (
        <span {...props} className={classes}>
            {name ? name : children}
        </span>
    )
}

export default Icon
