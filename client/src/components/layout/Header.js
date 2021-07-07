import { useContext } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

import { AuthContext } from '../../context/auth-context'

import NavItem from '../navItem/NavItem'

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)

    return (
        <header className="bg-dark">
            <Container>
                <Navbar variant="dark" expand="lg">
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
                            )}{' '}
                            {isAuthenticated && (
                                <NavItem to="/admin">Admin</NavItem>
                            )}
                            {isAuthenticated && (
                                <NavItem to="/customers">Customers</NavItem>
                            )}{' '}
                            {isAuthenticated && (
                                <NavItem to="/image-upload">
                                    Image Upload
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
