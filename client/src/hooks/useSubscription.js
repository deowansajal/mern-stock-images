import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useStripe } from '@stripe/react-stripe-js'

import isNotEqual from '../components/utils/isNotEqual'

const useSubscription = () => {
    const [recurringProducts, setRecurringProducts] = useState([])
    const stripe = useStripe()
    const subscribeHandler = async ({ priceId, orderId }) => {
        try {
            const { data } = await axios.post(
                `/api/subscription?mode=subscription`,
                {
                    data: {
                        priceId,
                        orderId,
                    },
                }
            )
            stripe.redirectToCheckout({ sessionId: data.data.sessionId })
        } catch (err) {
            console.log(err)
        }
    }

    const loadPricesList = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/subscription/pricing')
            if (isNotEqual(recurringProducts, data.data.recurringProducts)) {
                setRecurringProducts(data.data.recurringProducts)
            }
        } catch (err) {
            console.log(err.response)
        }
    }, [recurringProducts])

    useEffect(() => {
        loadPricesList()
    }, [loadPricesList])

    return { recurringProducts, subscribeHandler }
}

export default useSubscription
