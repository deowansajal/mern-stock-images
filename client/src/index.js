import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import App from './App'

import setAuthorizationHeader from './config/axiosConfig'

const stripePromise = loadStripe('pk_test_7hm9ZTecKjQjFa2CVqR9URT500EmAPFMBV')

setAuthorizationHeader()

ReactDOM.render(
    <Elements stripe={stripePromise}>
        <App />,
    </Elements>,
    document.getElementById('root')
)
