import { useContext, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import FormWrapper from '../components/utils/FormWrapper'
import { AuthContext } from '../context/auth-context'
import ToastMessage from '../components/utils/ToastMessage'
import FormControlGroup from '../components/forms/FormControlGroup'
import SubmitButton from '../components/forms/SubmitButton'
import useAuth from '../hooks/useAuth'

const initialEnteredUser = {
    email: '',
    password: '',
}

const Login = () => {
    const history = useHistory()
    const {
        login,
        successMessage,
        error,
        errorMessage,
        isLoading,
        setIsAuthenticated,
        setSuccessMessage,
    } = useContext(AuthContext)

    const successCallback = token => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
        setSuccessMessage('')
        history.push('/me')
    }

    const {
        changeHandler,
        submitHandler,
        enteredUser,
        successToastMessageCloseHandler,
        errorToastMessageCloseHandler,
    } = useAuth({
        initialEnteredUser,
        sendHttpRequest: login,
        successCallback,
    })

    return (
        <>
            {errorMessage && (
                <ToastMessage
                    message={errorMessage}
                    variant="danger"
                    onClose={errorToastMessageCloseHandler}
                />
            )}
            {successMessage && (
                <ToastMessage
                    message={successMessage}
                    variant="success"
                    onClose={successToastMessageCloseHandler}
                />
            )}
            <FormWrapper
                title="Login"
                to="/login"
                linkText=" Already have an account ?   ( Login here )"
            >
                <Form onSubmit={submitHandler}>
                    <FormControlGroup
                        onChange={changeHandler}
                        required
                        autoFocus
                        type="email"
                        name="email"
                        label="Email"
                        controlId="email"
                        value={enteredUser.email}
                        isInvalid={error.email}
                        feedback={error.email && error.email.email}
                    />
                    <FormControlGroup
                        onChange={changeHandler}
                        required
                        type="password"
                        name="password"
                        label="password"
                        controlId="password"
                        value={enteredUser.password}
                        isInvalid={error.password}
                        feedback={error.password && error.password.password}
                    />

                    <SubmitButton disabled={isLoading}>Submit</SubmitButton>
                </Form>
            </FormWrapper>
        </>
    )
}

export default Login
