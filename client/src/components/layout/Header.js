import { useContext } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context'

import styles from './Header.module.css'

const NavItem = ({ to, children, ...props }) => {
    return (
        <NavLink
            {...props}
            className={styles.link}
            activeClassName={styles['active-class']}
            to={to}
        >
            {children}
        </NavLink>
    )
}

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)

    return (
        <header className="bg-dark">
            <Container>
                <Navbar variant="dark" expand="md">
                    <Nav.Link href="/">
                        <Navbar.Brand className="text-light">Logo</Navbar.Brand>
                    </Nav.Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ml-auto">
                            {isAuthenticated && (
                                <NavItem to="me">Profile</NavItem>
                            )}

                            {isAuthenticated && (
                                <NavItem to="/login" onClick={logout}>
                                    Logout
                                </NavItem>
                            )}
                            {!isAuthenticated && (
                                <NavItem to="/signup">Signup</NavItem>
                            )}
                            {!isAuthenticated && (
                                <NavItem to="/login">Login</NavItem>
                            )}
                            <NavItem to="/cart">Cart</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    )
}
export default Header
