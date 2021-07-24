import { useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'

import { AuthContext } from '../../context/auth-context'
import { CartContext } from '../../context/cart-context'

import NavItem from '../navItem/NavItem'
import Icon from '../utils/Icon'

const Header = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext)
    const { cart } = useContext(CartContext)

    let navItems = (
        <NavDropdown title="Account" className="mr-4 font-weight-bold">
            <NavDropdown.Item as="span">
                <NavItem to="/login" className="text-dark">
                    Login
                </NavItem>
            </NavDropdown.Item>
            <NavDropdown.Item as="span">
                <NavItem to="/signup" className="text-dark">
                    Signup
                </NavItem>
            </NavDropdown.Item>
        </NavDropdown>
    )

    if (isAuthenticated && user && user.role !== 'admin') {
        navItems = (
            <NavDropdown
                title={user.name && user.name.toUpperCase()}
                id="nav-dropdown"
                className="mr-4 font-weight-bold"
            >
                <NavDropdown.Item as="span">
                    <NavItem to="/me" className="text-dark">
                        Profile
                    </NavItem>
                </NavDropdown.Item>
                <NavDropdown.Item as="span">
                    <NavItem to="/me/orders" className="text-dark">
                        Orders
                    </NavItem>
                </NavDropdown.Item>
                <NavDropdown.Item as="span">
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
                        <Navbar.Brand className="text-light ">
                            Logo
                        </Navbar.Brand>
                    </Nav.Link>

                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ml-auto">
                            {navItems}

                            {user.role !== 'admin' && (
                                <NavItem to="/cart">
                                    <div className="position-relative">
                                        <Icon name="shopping_cart" />
                                        <Badge
                                            variant="primary"
                                            style={{
                                                position: 'absolute',
                                                top: '-7px',
                                                right: '-5px',
                                            }}
                                        >
                                            {cart.totalCartItems}
                                        </Badge>
                                    </div>
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
