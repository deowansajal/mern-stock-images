import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth-context'

const useAuth = ({ initialEnteredUser, sendHttpRequest, successCallback }) => {
    const [enteredUser, setEnteredUser] = useState({ ...initialEnteredUser })
    const {
        setSuccessMessage,
        error,
        setError,
        setErrorMessage,
        setIsLoading,
    } = useContext(AuthContext)

    const updateErrorObject = name => {
        if (error[name]) {
            const newError = { ...error }
            delete newError[name]
            setError(newError)
        }
    }

    const changeHandler = e => {
        const { name, value } = e.target
        setEnteredUser(previousEnteredUser => {
            return { ...previousEnteredUser, [name]: value }
        })
        updateErrorObject(name)
    }

    const submitHandler = e => {
        e.preventDefault()

        setIsLoading(true)
        setErrorMessage('')
        setSuccessMessage('')

        sendHttpRequest(enteredUser)
            .then(({ data }) => {
                console.log(data)
                setIsLoading(false)
                setEnteredUser({ ...initialEnteredUser })
                setSuccessMessage(data.message)
                successCallback(data.data.token)
            })
            .catch(err => {
                console.log(err)
                const { error, message } = err.response.data
                setError(error)
                setErrorMessage(message)
                setIsLoading(false)
            })
    }

    const successToastMessageCloseHandler = e => setSuccessMessage('')

    const errorToastMessageCloseHandler = e => setErrorMessage('')

    useEffect(() => {
        return () => {
            setErrorMessage('')
            setSuccessMessage('')
            setError({})
        }
    }, [setSuccessMessage, setErrorMessage, setError])

    return {
        changeHandler,
        submitHandler,
        enteredUser,
        successToastMessageCloseHandler,
        errorToastMessageCloseHandler,
    }
}

export default useAuth
