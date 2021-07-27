import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import App from './App'
import AuthProvider from './context/auth-context'
import ImagesProvider from './context/images-context'

import setAuthorizationHeader from './config/axiosConfig'
import CartProvider from './context/cart-context'
import axios from 'axios'
;(async () => {
    const { data } = await axios.get('/config')

    const stripePromise = loadStripe(data.STRIPE_PUBLIC_KEY)

    setAuthorizationHeader()

    ReactDOM.render(
        <Elements stripe={stripePromise}>
            <AuthProvider>
                <ImagesProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </ImagesProvider>
            </AuthProvider>
        </Elements>,
        document.getElementById('root')
    )
})()
