import React, { useState, useEffect, useCallback } from 'react'
import useHttp from '../hooks/useHttp'

const initialAuthContext = {
    isAuthenticated: false,
    isLoading: false,
    isRequestSuccess: false,
    statusCode: 200,
    errorMessage: '',
    successMessage: '',
    user: {},
    error: {},
    signup: (name, email, password) => {},
    login: (email, password) => {},
    logout: () => {},
    getMe: () => {},
}

export const AuthContext = React.createContext(initialAuthContext)

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token')
    const hasToken = token && token !== 'undefined' && token !== null
    const [isAuthenticated, setIsAuthenticated] = useState(hasToken)
    const [user, setUser] = useState({})
    const [error, setError] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isRequestSuccess, setIsRequestSuccess] = useState(false)

    const sendHttpRequest = useHttp()

    const signup = async ({ name, email, password }) => {
        return await sendHttpRequest({
            method: 'post',
            url: '/api/auth/signup',
            data: { name, email, password },
        })
    }

    const login = async ({ email, password }) => {
        return await sendHttpRequest({
            method: 'post',
            url: '/api/auth/login',
            data: { email, password },
        })
    }
    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    const getMe = useCallback(async () => {
        sendHttpRequest({
            url: '/api/auth/me',
        })
            .then(({ data }) => {
                setUser(data.data)
            })
            .catch(err => {
                const { error, message } = err.response.data
                setError(error)
                setErrorMessage(message)
            })
    }, [sendHttpRequest])

    const value = {
        login,
        signup,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
        isLoading,
        setIsLoading,
    }

    useEffect(() => {
        if (hasToken) {
            getMe()
        }
    }, [getMe, hasToken])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
