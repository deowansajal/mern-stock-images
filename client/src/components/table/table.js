import classNames from 'classnames'

export const Th = ({ className, children, ...props }) => {
    const classes = classNames({
        [className]: classNames,
        'border-bottom-0': true,
    })

    return (
        <th {...props} className={classes}>
            {children ? children : null}
        </th>
    )
}
export const Td = ({ className, children, ...props }) => {
    const classes = classNames({
        [className]: classNames,
        'border-bottom-0': true,
    })

    return (
        <td {...props} className={classes}>
            {children ? children : null}
        </td>
    )
}

export const THeader = ({ className, titles = [] }) => {
    const classes = classNames({
        [className]: classNames,
        'border-bottom-0': true,
    })

    return (
        <thead className={classes}>
            <tr>
                {titles.map(title => (
                    <th key={title}>{title}</th>
                ))}
            </tr>
        </thead>
    )
}
