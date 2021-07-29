import { useEffect, useState } from 'react'
import axios from 'axios'

const useCustomer = id => {
    const [customer, setCustomer] = useState({})
    const [user, setUser] = useState({})
    const [orders, setOrders] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source()
        const getCustomer = () => {
            axios({
                url: `/api/admin/customers/${id}`,
                cancelToken: cancelTokenSource.token,
            })
                .then(({ data }) => {
                    setCustomer(data.data.customer)
                    setOrders(data.data.orders)
                    setUser(data.data.user)
                })
                .catch(err => {
                    if (err.response) {
                        setErrorMessage(err.response.data.message)
                    }
                })
        }

        getCustomer()

        return cancelTokenSource.cancel
    }, [id])

    return {
        customer,
        user,
        errorMessage,
        orders,
    }
}

export default useCustomer
