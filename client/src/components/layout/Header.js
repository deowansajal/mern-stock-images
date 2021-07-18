import { useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

import { AuthContext } from '../../context/auth-context'

import NavItem from '../navItem/NavItem'
import Icon from '../utils/Icon'

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
            <NavDropdown
                title={user.name && user.name.toUpperCase()}
                id="nav-dropdown"
            >
                <NavDropdown.Item>
                    <NavItem to="/me" className="text-dark">
                        Profile
                    </NavItem>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <NavItem to="/me/orders" className="text-dark">
                        Orders
                    </NavItem>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <NavItem to="/login" onClick={logout} className="text-dark">
                        Logout
                    </NavItem>
                </NavDropdown.Item>
            </NavDropdown>
        )
    }

    if (isAuthenticated && user && user.role === 'admin') {
        navItems = (
            <>
                <NavItem to="/admin">Admin</NavItem>
                <NavItem to="/admin/customers">Customers</NavItem>
            </>
        )
    }
    return (
        <header className="bg-dark">
            <Container>
                <Navbar variant="dark" expand="lg">
                    <Nav.Link href="/">
                        <Navbar.Brand className="text-light p-0">
                            Logo
                        </Navbar.Brand>
                    </Nav.Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ml-auto">
                            {navItems}

                            {user.role !== 'admin' && (
                                <NavItem to="/cart">
                                    <Icon name="shopping_cart" />
                                </NavItem>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    )
}
export default Header
