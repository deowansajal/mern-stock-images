import React from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { THeader, Td } from '../components/table/Table'
import useCustomers from '../hooks/useCustomers'
import ContainerWrapper from '../components/utils/ContainerWrapper'

const tdContent = content => {
    if (!content) {
        return 'N/A'
    }

    return content
}

const Customers = () => {
    const { customers } = useCustomers()

    return (
        <ContainerWrapper>
            <Container>
                <h1 className=" text-uppercase mb-5">Customers</h1>
                <Table responsive>
                    <THeader titles={['Id', 'name', 'email', '']} />
                    <tbody>
                        {customers.length > 0 &&
                            customers.map(customer => (
                                <tr key={customer.id}>
                                    <Td>{customer.id}</Td>
                                    <Td>{tdContent(customer.name)}</Td>
                                    <Td>{tdContent(customer.email)}</Td>
                                    <Td>
                                        <Link to={`/customers/${customer.id}`}>
                                            <Button variant="outline-primary">
                                                Details
                                            </Button>
                                        </Link>
                                    </Td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>
        </ContainerWrapper>
    )
}

export default Customers
