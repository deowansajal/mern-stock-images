import { useContext } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

import { AuthContext } from '../../context/auth-context'

import NavItem from '../navItem/NavItem'

const Header = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext)

    let navItems = (
        <>
            <NavItem to="/signup">Signup</NavItem>
            <NavItem to="/login">Login</NavItem>
        </>
    )

    if (isAuthenticated && user && user.role !== 'admin') {
        navItems = (
            <>
                <NavItem to="me">Profile</NavItem>
            </>
        )
    }

    if (isAuthenticated && user && user.role === 'admin') {
        navItems = (
            <>
                <NavItem to="/admin">Admin</NavItem>
                <NavItem to="/admin/upload">Add Image</NavItem>
                <NavItem to="/customers">Customers</NavItem>
            </>
        )
    }
    console.log('isAuthenticated', isAuthenticated)
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
                            {navItems}
                            {isAuthenticated && (
                                <NavItem to="/login" onClick={logout}>
                                    Logout
                                </NavItem>
                            )}
                            {user.role !== 'admin' && (
                                <NavItem to="/cart">Cart</NavItem>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    )
}
export default Header
