import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import AuthProvider from './context/auth-context'

import App from './App'

import setAuthorizationHeader from './config/axiosConfig'

setAuthorizationHeader()

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,

    document.getElementById('root')
)
