import React, { useState, useContext, useEffect } from 'react'

import { useParams, useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import axios from 'axios'

import FormControlGroup from '../components/forms/FormControlGroup'
import FormWrapper from '../components/forms/FormWrapper'
import SubmitButton from '../components/forms/SubmitButton'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import { AuthContext } from '../context/auth-context'

const ResetPassword = () => {
    const [enteredPassword, setEnteredPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { resettoken } = useParams()
    const [isDone, setIsDone] = useState(false)

    const { setIsAuthenticated } = useContext(AuthContext)

    const changeHandler = e => {
        setEnteredPassword(e.target.value)

        if (errorMessage) {
            setErrorMessage('')
        }
    }
    const submitHandler = e => {
        e.preventDefault()
        setIsLoading(true)
        axios({
            method: 'put',
            url: `/api/auth/resetpassword/${resettoken}`,
            data: { password: enteredPassword },
        })
            .then(({ data }) => {
                localStorage.setItem('token', data.data.token)
                setErrorMessage('')
                setEnteredPassword('')
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
            setIsAuthenticated(true)

            return () => setIsDone(false)
        }
    }, [isDone, setIsAuthenticated])

    return (
        <ContainerWrapper>
            <FormWrapper isLoading={isLoading}>
                <Form onSubmit={submitHandler}>
                    <FormControlGroup
                        onChange={changeHandler}
                        required
                        autoFocus
                        type="password"
                        name="password"
                        label="New Password"
                        controlId="password"
                        value={enteredPassword}
                        isInvalid={errorMessage}
                        feedback={errorMessage}
                    />
                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </FormWrapper>
        </ContainerWrapper>
    )
}

export default ResetPassword
