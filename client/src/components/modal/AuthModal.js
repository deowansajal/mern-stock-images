import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Modal from 'react-modal'
import { Button } from 'react-bootstrap'
import styles from './AuthModal.module.css'

import Login from '../../pages/Login'
import Signup from '../../pages/Signup'
import Icon from '../utils/Icon'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -30%)',
    },
}

Modal.setAppElement('#modal')

const AuthModal = ({
    isOpen,
    setIsOpen,
    onAfterOpen,
    onRequestClose,
    onClose,
}) => {
    const [isLoginMode, setIsLoginMode] = useState(true)
    const history = useHistory()

    const getSignupSuccessConfirmation = isSuccess => {
        setIsLoginMode(true)
    }
    const getLoginSuccessConfirmation = isSuccess => {
        setIsOpen(false)
        history.push('/cart/checkout')
    }

    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button type="button" className="close" onClick={onClose}>
                <Icon name="close" />
            </button>
            <div className={styles['modal-content-wrapper']}>
                {isLoginMode && (
                    <Login
                        isCheckout={true}
                        getLoginSuccessConfirmation={
                            getLoginSuccessConfirmation
                        }
                    />
                )}
                {!isLoginMode && (
                    <Signup
                        isCheckout={true}
                        getSignupSuccessConfirmation={
                            getSignupSuccessConfirmation
                        }
                    />
                )}
            </div>
            {isLoginMode && (
                <p>
                    Don't have an account ?
                    <button
                        onClick={() => setIsLoginMode(false)}
                        className="btn btn-link"
                    >
                        Sign up here
                    </button>
                </p>
            )}

            {!isLoginMode && (
                <p>
                    Already have an account ?
                    <button
                        onClick={() => setIsLoginMode(true)}
                        className="btn btn-link"
                    >
                        Login up here
                    </button>
                </p>
            )}
        </Modal>
    )
}

export default AuthModal
