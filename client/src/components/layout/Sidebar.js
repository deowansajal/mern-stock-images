import { useState } from 'react'
import { Button, Navbar, ListGroup } from 'react-bootstrap'

import NavItem from '../navItem/NavItem'
import styles from './Sidebar.module.css'

const ListGroupItem = ({ text, children, to }) => (
    <ListGroup.Item className={`${styles['sidebar-list-item']}   bg-dark`}>
        <NavItem
            to={to}
            style={{
                width: '400px',
                display: 'block',
                margin: 0,
            }}
        >
            {children ? children : text}
        </NavItem>
    </ListGroup.Item>
)

const Sidebar = ({ name, ...props }) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div
            className={`${styles['sidebar-wrapper']}  position-fixed   shadow bg-dark`}
        >
            <sidebar>
                <Navbar className="p-0 ">
                    <ListGroup className={`${styles['sidebar-list']}  p-0`}>
                        <ListGroupItem to="/customers">
                            All Customers
                        </ListGroupItem>
                        <ListGroupItem to="/upload-image">
                            Image Upload
                        </ListGroupItem>
                    </ListGroup>
                </Navbar>
            </sidebar>
        </div>
    )
}

export default Sidebar
