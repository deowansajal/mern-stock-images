import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import styles from './NavItem.module.css'

const NavItem = ({ to, children, className, ...props }) => {
    const classes = classNames({
        [styles.link]: styles.link,
        [className]: className,
    })

    return (
        <NavLink
            exact
            {...props}
            className={classes}
            activeClassName={styles['active-class']}
            to={to}
        >
            {children}
        </NavLink>
    )
}

export default NavItem
