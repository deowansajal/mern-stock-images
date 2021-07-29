import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

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
    const [authorizedImages, setAuthorizedImages] = useState([])
    const [error, setError] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const signup = async ({ name, email, password }) => {
        return await axios({
            method: 'post',
            url: '/api/auth/signup',
            data: { name, email, password },
        })
    }

    const login = async ({ email, password }) => {
        return await axios({
            method: 'post',
            url: '/api/auth/login',
            data: { email, password },
        })
    }
    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    const getMe = useCallback(cancelTokenSource => {
        axios({
            url: '/api/auth/me',
            cancelToken: cancelTokenSource.token,
        })
            .then(({ data }) => {
                setUser(data.data.user)
                setAuthorizedImages(data.data.images)
            })
            .catch(err => {
                const { error, message } = err.response.data
                setError(error)
                setErrorMessage(message)
            })
    }, [])

    const value = {
        login,
        signup,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        user,
        authorizedImages,
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
        const cancelTokenSource = axios.CancelToken.source()

        if (hasToken) {
            getMe(cancelTokenSource)
        }

        return cancelTokenSource.cancel
    }, [getMe, hasToken])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
