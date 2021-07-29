import { useState, useContext } from 'react'
import { Form, FormControl, FormLabel } from 'react-bootstrap'
import SubmitButton from '../forms/SubmitButton'
import FormControlGroup from '../forms/FormControlGroup'
import FormWrapper from '../forms/FormWrapper'
import { ImagesContext } from '../../context/images-context'

const initialMainImageFileLabel = 'Choose main image...'
const initialThumbnailFileLabel = 'Choose thumbnail...'

const ImageUpload = ({ initialImageTextData, imageId }) => {
    const [mainImageFilename, setMainImageFilename] = useState(
        initialMainImageFileLabel
    )
    const [thumbnailFilename, setThumbnailFilename] = useState(
        initialThumbnailFileLabel
    )
    const [mainImage, setMainImage] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [imageTextData, setImageTextData] = useState({
        ...initialImageTextData,
    })

    const {
        uploadImage,
        setSuccessMessage,
        setError,
        setErrorMessage,
        setImages,
        setIsLoading,
        isLoading,
    } = useContext(ImagesContext)

    const mainImageChangeHandler = e => {
        const mainImage = e.target.files[0]
        if (mainImage) {
            setMainImage(mainImage)
            setMainImageFilename(mainImage.name)
        }
        e.target.value = null
    }
    const thumbnailChangeHandler = e => {
        const thumbnail = e.target.files[0]
        if (thumbnail) {
            setThumbnail(thumbnail)
            setThumbnailFilename(thumbnail.name)
        }

        e.target.value = null
    }

    const submitHandler = async e => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append('mainImage', mainImage)
        formData.append('thumbnail', thumbnail)
        formData.append('name', imageTextData.name)
        formData.append('price', imageTextData.price)
        formData.append('description', imageTextData.description)

        uploadImage(formData, imageId)
            .then(({ data }) => {
                setImages(previousImages => {
                    return [...previousImages, { ...data.data }]
                })
                setSuccessMessage(data.message)
                setImageTextData({ ...initialImageTextData })
                setThumbnailFilename(initialThumbnailFileLabel)
                setMainImageFilename(initialMainImageFileLabel)

                setIsLoading(false)
            })
            .catch(err => {
                const { error, message } = err.response.data
                setError(error)
                setErrorMessage(message)
                setIsLoading(false)
            })
    }

    const changeHandler = e => {
        setImageTextData(previousImageTextData => {
            return { ...previousImageTextData, [e.target.name]: e.target.value }
        })
    }

    return (
        <>
            <FormWrapper isLoading={isLoading}>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="custom-file mb-4">
                        <FormControl
                            autoFocus
                            name="mainImage"
                            onChange={mainImageChangeHandler}
                            type="file"
                            className="custom-file-input"
                        />
                        <FormLabel className="custom-file-label">
                            {mainImageFilename}
                        </FormLabel>
                    </Form.Group>
                    <Form.Group className="custom-file mb-3">
                        <FormControl
                            name="thumbnail"
                            onChange={thumbnailChangeHandler}
                            type="file"
                            className="custom-file-input"
                        />
                        <FormLabel className="custom-file-label">
                            {thumbnailFilename}
                        </FormLabel>
                    </Form.Group>

                    <FormControlGroup
                        onChange={changeHandler}
                        required
                        name="name"
                        label="Name"
                        controlId="name"
                        value={imageTextData.name}
                    />
                    <FormControlGroup
                        onChange={changeHandler}
                        required
                        type="number"
                        name="price"
                        label="Price"
                        controlId="price"
                        value={imageTextData.price}
                    />
                    <FormControlGroup
                        onChange={changeHandler}
                        required
                        name="description"
                        label="Image Descriptions"
                        controlId="description"
                        as="textarea"
                        value={imageTextData.description}
                    />

                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </FormWrapper>
        </>
    )
}

export default ImageUpload
