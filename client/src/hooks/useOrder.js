import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import convertQueryStringToObject from '../components/utils/convertQueryStringToObject'
import { CartContext } from '../context/cart-context'

const useOrderLoad = () => {
    const [orders, setOrders] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    console.log(orders)

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source()
        axios
            .get('/api/orders', {
                cancelToken: cancelTokenSource.token,
            })
            .then(({ data }) => {
                const responseOrders = data.data.orders
                if (JSON.stringify(orders) !== JSON.stringify(responseOrders)) {
                    setOrders([...responseOrders])
                }
            })
            .catch(err => {
                console.log(err.message)
                setErrorMessage(err.response.data.message)
            })

        return cancelTokenSource.cancel
    }, [orders])

    return { orders, ordersErrorMessage: errorMessage }
}

const useOrderCheckoutSession = () => {
    const [paymentStatus, setPaymentStatus] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const location = useLocation()

    const { sessionId } = convertQueryStringToObject(location.search)

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source()

        if (sessionId) {
            axios
                .get(`/api/orders/checkout-session/${sessionId}`, {
                    cancelToken: cancelTokenSource.token,
                })
                .then(({ data }) => {
                    setPaymentStatus(data.data.paymentStatus)
                })
                .catch(err => {
                    setErrorMessage(err.response.data.message)
                })
        }

        return cancelTokenSource.cancel
    }, [sessionId])

    return { paymentStatus, checkoutSessionErrorMessage: errorMessage }
}

const useOrder = () => {
    const { orders } = useOrderLoad()
    const { paymentStatus } = useOrderCheckoutSession()
    const { resetCart } = useContext(CartContext)
    const [orderId, setOrderId] = useState(null)

    useEffect(() => {
        if (paymentStatus === 'paid') {
            resetCart()
        }
    }, [paymentStatus, resetCart])
    return { orders, orderId, setOrderId }
}

export default useOrder
