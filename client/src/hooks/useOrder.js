import { useState, useEffect, useCallback, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import isNotEqual from '../components/utils/isNotEqual'
import convertQueryStringToObject from '../components/utils/convertQueryStringToObject'
import { CartContext } from '../context/cart-context'

const useOrder = () => {
    const [orders, setOrders] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('unpaid')
    const location = useLocation()

    const { resetCart } = useContext(CartContext)

    const { sessionId } = convertQueryStringToObject(location.search)

    const loadOrders = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/orders')

            if (orders.length === 0) {
                setOrders(data.data.orders)
            }
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
    }, [orders.length])

    const getOrderCheckoutSession = useCallback(async () => {
        try {
            const { data } = await axios.get(
                `/api/orders/checkout-session/${sessionId}`
            )

            setPaymentStatus(data.data.paymentStatus)
        } catch (err) {
            const { message } = err.response
            console.log(message)
            setErrorMessage(message)
        }
    }, [sessionId])

    useEffect(() => {
        loadOrders()

        if (sessionId) {
            getOrderCheckoutSession()
        }
        if (paymentStatus === 'paid') {
            resetCart()
        }
    }, [
        loadOrders,
        getOrderCheckoutSession,
        sessionId,
        paymentStatus,
        resetCart,
    ])
    return { orders }
}

export default useOrder
