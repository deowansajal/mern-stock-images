import { useEffect, useState } from 'react'
import axios from 'axios'

const useCustomers = () => {
    const [customers, setCustomers] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const getCustomers = () => {
        axios({
            url: '/api/admin/customers',
        })
            .then(({ data }) => {
                setCustomers(data.data.customers)
            })
            .catch(err => {
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            })
    }

    useEffect(() => {
        getCustomers()
    }, [])

    return {
        customers,
        errorMessage,
    }
}

export default useCustomers
