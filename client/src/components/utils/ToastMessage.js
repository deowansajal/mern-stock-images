import Container from 'react-bootstrap/Container'
import Toast from 'react-bootstrap/Toast'
import Alert from 'react-bootstrap/Alert'

const ToastMessage = ({ message, children, variant, onClose }) => {
    // const bodyClasses = {
    //     primary: 'text-primary',
    //     success: 'text-success',
    //     danger: 'text-danger',
    // }

    return (
        <Container className="mt-5">
            {
                <Alert
                    variant={variant}
                    style={{
                        maxWidth: 500,
                        margin: '0 auto',
                    }}
                    dismissible
                    onClose={onClose}
                >
                    {children ? children : message}
                </Alert>
            }
            {/* <Toast className="m-auto" variant="primary" onClose={onClose}>
                <Toast.Header></Toast.Header>
                <Toast.Body className={bodyClasses[variant]}>
                    {children ? children : message}
                </Toast.Body>
            </Toast> */}
        </Container>
    )
}

export default ToastMessage
