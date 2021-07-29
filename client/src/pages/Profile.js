import { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

import SingleImage from '../components/images/SingleImage'
import styles from '../components/images/Images.module.css'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import FormControlGroup from '../components/forms/FormControlGroup'
import { AuthContext } from '../context/auth-context'
import { ImagesContext } from '../context/images-context'
import SubmitButton from '../components/forms/SubmitButton'

import axios from 'axios'

const Profile = () => {
    const { user, setUser, authorizedImages } = useContext(AuthContext)
    const { setCurrentImage } = useContext(ImagesContext)
    const { name, email } = user

    const [profile, setProfile] = useState({
        password: '',
        confirmPassword: '',
        name,
        email,
    })
    const [error, setError] = useState({})

    const updateErrorObject = name => {
        if (error[name]) {
            const newError = { ...error }
            delete newError[name]
            setError(newError)
        }
    }

    const changeHandler = e => {
        const { name, value } = e.target
        setProfile(previousProfile => {
            return { ...previousProfile, [name]: value }
        })
        updateErrorObject(name)
    }

    const submitHandler = e => {
        e.preventDefault()

        axios({
            url: '/api/auth/me',
            method: 'put',
            data: {
                ...profile,
            },
        })
            .then(({ data }) => {
                setProfile({
                    password: '',
                    confirmPassword: '',
                    name,
                    email,
                })
                setUser(previousUser => {
                    return { ...previousUser, name: data.data.name }
                })
            })
            .catch(err => {
                if (err.response) {
                    setError({ ...err.response.data.error })
                }
            })
    }

    useEffect(() => {
        setProfile(previousProfile => {
            return { ...previousProfile, name, email }
        })
    }, [name, email])
    return (
        <ContainerWrapper>
            <Container fluid>
                <Row>
                    <Col lg={3}>
                        <Form onSubmit={submitHandler} className="mb-5">
                            <FormControlGroup
                                onChange={changeHandler}
                                required
                                name="name"
                                label="Name"
                                controlId="name"
                                value={profile.name}
                                isInvalid={error.name}
                                feedback={error.name && error.name.name}
                            />
                            <FormControlGroup
                                disabled
                                type="email"
                                name="email"
                                label="Email"
                                value={email}
                            />
                            <FormControlGroup
                                onChange={changeHandler}
                                name="password"
                                type="password"
                                label="New Password"
                                controlId="password"
                                value={profile.password}
                                isInvalid={error.password}
                                feedback={
                                    error.password && error.password.password
                                }
                            />
                            <FormControlGroup
                                onChange={changeHandler}
                                required={profile.password}
                                name="confirmPassword"
                                type="password"
                                label="Current Password"
                                controlId="confirmPassword"
                                value={profile.confirmPassword}
                                isInvalid={error.confirmPassword}
                                feedback={
                                    error.confirmPassword &&
                                    error.confirmPassword.confirmPassword
                                }
                            />
                            <SubmitButton>Update Profile</SubmitButton>
                        </Form>
                    </Col>
                    <Col lg={{ span: 9, offset: 0 }}>
                        <div className={styles['images-container']}>
                            {authorizedImages.map(image => (
                                <SingleImage
                                    image={image}
                                    key={image._id}
                                    setCurrentImage={setCurrentImage}
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </ContainerWrapper>
    )
}

export default Profile
