import { useState, useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import Images from '../components/images/Images'
import ImageUpload from '../components/images/ImageUpload'
import ToastMessage from '../components/utils/ToastMessage'
import { ImagesContext } from '../context/images-context'
import Icon from '../components/utils/Icon'

const initialImageTextData = {
    name: '',
    price: '',
    description: '',
}

const Admin = () => {
    const [uploadFormIsShown, setUploadFormIsShown] = useState(false)

    const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
        useContext(ImagesContext)

    const successToastMessageCloseHandler = e => setSuccessMessage('')
    const errorToastMessageCloseHandler = e => setErrorMessage('')

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
            <div className="text-center my-5">
                <Button
                    onClick={() => setUploadFormIsShown(!uploadFormIsShown)}
                >
                    {!uploadFormIsShown ? (
                        <Icon name="add_circle_outline" />
                    ) : (
                        <Icon name="close" />
                    )}
                </Button>
            </div>

            {uploadFormIsShown && (
                <ImageUpload initialImageTextData={initialImageTextData} />
            )}

            <Container fluid style={{ marginTop: '5rem' }}>
                <Images />
            </Container>
        </>
    )
}

export default Admin
