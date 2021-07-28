import React, { useState, useEffect, useContext } from 'react'
import { Form, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import FormControlGroup from '../components/forms/FormControlGroup'
import FormWrapper from '../components/forms/FormWrapper'
import SubmitButton from '../components/forms/SubmitButton'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import { AuthContext } from '../context/auth-context'

const ForgotPassword = () => {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const { setSuccessMessage } = useContext(AuthContext)

    const history = useHistory()

    const changeHandler = e => {
        setEnteredEmail(e.target.value)

        if (errorMessage) {
            setErrorMessage('')
        }
    }
    const submitHandler = e => {
        e.preventDefault()
        setIsLoading(true)
        axios({
            method: 'post',
            url: '/api/auth/forgotpassword',
            data: { email: enteredEmail },
        })
            .then(({ data }) => {
                setEnteredEmail('')
                setErrorMessage('')
                setSuccessMessage(data.message)
                setIsDone(true)
            })
            .catch(err => {
                console.log(err.message)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (isDone) {
            history.push('/login')
            return () => {
                setIsDone(false)
            }
        }
    }, [isDone, history])

    return (
        <ContainerWrapper>
            <FormWrapper isLoading={isLoading}>
                <Form onSubmit={submitHandler}>
                    <FormControlGroup
                        onChange={changeHandler}
                        required
                        autoFocus
                        type="email"
                        name="email"
                        label="Email"
                        controlId="email"
                        value={enteredEmail}
                        isInvalid={errorMessage}
                        feedback={errorMessage}
                    />
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </FormWrapper>
        </ContainerWrapper>
    )
}

export default ForgotPassword
