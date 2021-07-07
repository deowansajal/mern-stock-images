import { NavLink } from 'react-router-dom'
import styles from './NavItem.module.css'

const NavItem = ({ to, children, ...props }) => {
    return (
        <NavLink
            exact
            {...props}
            className={styles.link}
            activeClassName={styles['active-class']}
            to={to}
        >
            {children}
        </NavLink>
    )
}

export default NavItem
