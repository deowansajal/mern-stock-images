import { useState, useContext } from 'react'
import { Form, FormControl, FormLabel } from 'react-bootstrap'
import SubmitButton from '../forms/SubmitButton'
import FormControlGroup from '../forms/FormControlGroup'
import FormWrapper from '../forms/FormWrapper'
import FormTitle from '../forms/FormTitle'
import { ImagesContext } from '../../context/images-context'

const initialImageTextData = {
    name: '',
    price: '',
    description: '',
}

const ImageUpload = () => {
    const [filename, setFilename] = useState('Chose images...')
    const [mainImage, setMainImage] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [imageTextData, setImageTextData] = useState({
        ...initialImageTextData,
    })

    const { uploadImage, images, setIsLoading } = useContext(ImagesContext)

    const fileChangeHandler = e => {
        const thumbnail = e.target.files[0]
        const mainImage = e.target.files[1]

        if (mainImage && thumbnail) {
            setFilename(`${mainImage.name}, ${thumbnail.name}`)
            setMainImage(mainImage)
            setThumbnail(thumbnail)
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
        const uploadResult = await uploadImage(formData)
        setIsLoading(false)

        console.log('uploadResult', uploadResult, images)
    }

    const changeHandler = e => {
        setImageTextData(previousImageTextData => {
            return { ...previousImageTextData, [e.target.name]: e.target.value }
        })
    }
    return (
        <FormWrapper>
            <FormTitle title="Upload Images" className="mb-5" />
            <Form onSubmit={submitHandler}>
                <Form.Group className="custom-file mb-3">
                    <FormControl
                        autoFocus
                        multiple
                        onChange={fileChangeHandler}
                        type="file"
                        className="custom-file-input"
                    />
                    <FormLabel className="custom-file-label">
                        {filename}
                    </FormLabel>
                </Form.Group>

                <FormControlGroup
                    onChange={changeHandler}
                    required
                    name="name"
                    label="Name"
                    controlId="name"
                    value={imageTextData.name}
                    // isInvalid={error.email}
                    // feedback={error.email && error.email.email}
                />
                <FormControlGroup
                    onChange={changeHandler}
                    required
                    type="number"
                    name="price"
                    label="Price"
                    controlId="price"
                    value={imageTextData.price}
                    // isInvalid={error.email}
                    // feedback={error.email && error.email.email}
                />
                <FormControlGroup
                    onChange={changeHandler}
                    required
                    name="description"
                    label="Image Descriptions"
                    controlId="description"
                    as="textarea"
                    value={imageTextData.description}
                    // isInvalid={error.password}
                    // feedback={error.password && error.password.password}
                />

                <SubmitButton>Submit</SubmitButton>
            </Form>
        </FormWrapper>
    )
}

export default ImageUpload
