import { useContext } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import FormWrapper from '../components/forms/FormWrapper'
import { AuthContext } from '../context/auth-context'
import ToastMessage from '../components/utils/ToastMessage'
import FormControlGroup from '../components/forms/FormControlGroup'
import SubmitButton from '../components/forms/SubmitButton'
import LinkButton from '../components/forms/LinkButton'
import FormTitle from '../components/forms/FormTitle'
import useAuth from '../hooks/useAuth'

const initialEnteredUser = {
    name: '',
    email: '',
    password: '',
}

const Signup = () => {
    const { signup, error, errorMessage, isLoading } = useContext(AuthContext)
    const history = useHistory()

    const successCallback = () => {
        history.push('/login')
    }

    const {
        changeHandler,
        submitHandler,
        enteredUser,
        errorToastMessageCloseHandler,
    } = useAuth({
        initialEnteredUser,
        sendHttpRequest: signup,
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

            <FormWrapper isLoading={isLoading}>
                <FormTitle title={'Signup'} />
                <Form onSubmit={submitHandler}>
                    <FormControlGroup
                        onChange={changeHandler}
                        required
                        autoFocus
                        name="name"
                        label="Name"
                        controlId="name"
                        value={enteredUser.name}
                        isInvalid={error.name}
                        feedback={error.name && error.name.name}
                    />

                    <FormControlGroup
                        onChange={changeHandler}
                        required
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

                    <SubmitButton>Submit</SubmitButton>
                    <LinkButton to="/login" text="Login">
                        Already have an account
                    </LinkButton>
                </Form>
            </FormWrapper>
        </>
    )
}

export default Signup
