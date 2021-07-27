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
export const Td = ({ className, style = {}, children, ...props }) => {
    const classes = classNames({
        [className]: classNames,
        'border-bottom-0': true,
    })

    const styles = {
        verticalAlign: 'middle',
        ...style,
    }
    return (
        <td {...props} className={classes} style={{ ...styles }}>
            {children ? children : null}
        </td>
    )
}

export const THeader = ({ className, titles = [], thStyle = {} }) => {
    const classes = classNames({
        [className]: classNames,
        'border-bottom-0': true,
    })

    return (
        <thead className={classes}>
            <tr>
                {titles.map(title => (
                    <th style={{ border: 0, ...thStyle }} key={title}>
                        {title}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
