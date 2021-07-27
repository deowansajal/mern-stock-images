import { useState, useEffect } from 'react'
import axios from 'axios'
import { useStripe } from '@stripe/react-stripe-js'

const usePriceListLoad = setErrorMessage => {
    const [recurringProducts, setRecurringProducts] = useState([])

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source()

        axios
            .get('/api/subscription/pricing', {
                cancelToken: cancelTokenSource.token,
            })
            .then(({ data }) => {
                setRecurringProducts(data.data.recurringProducts)
            })
            .catch(err => {
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
                console.log(err)
            })

        return cancelTokenSource.cancel
    }, [setErrorMessage])

    return { recurringProducts }
}

const useSubscription = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const { recurringProducts } = usePriceListLoad(setErrorMessage)
    const stripe = useStripe()

    const subscribeHandler = ({ priceId, orderId }) => {
        axios
            .post(`/api/subscription?mode=subscription`, {
                data: {
                    priceId,
                    orderId,
                },
            })
            .then(({ data }) => {
                stripe.redirectToCheckout({ sessionId: data.data.sessionId })
            })
            .catch(err => {
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
                console.log(err)
            })
    }

    const manageSubscriptionBillingHandler = ({ priceId, subscriptionId }) => {
        axios
            .post('/api/subscription/manage-billing', {
                data: {
                    priceId,
                    subscriptionId,
                },
            })
            .then(({ data }) => {
                window.location.href = data.data.url
            })
            .catch(err => {
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
                console.log(err.message)
            })
    }

    return {
        recurringProducts,
        subscribeHandler,
        manageSubscriptionBillingHandler,
        errorMessage,
    }
}

export default useSubscription
