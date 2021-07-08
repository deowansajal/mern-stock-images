import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

const ToastMessage = ({ message, children, variant, onClose }) => {
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
        </Container>
    )
}

export default ToastMessage
