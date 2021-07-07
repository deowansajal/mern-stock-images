import { useState, useContext } from 'react'
import { Form, FormControl, FormLabel } from 'react-bootstrap'
import SubmitButton from '../forms/SubmitButton'
import FormControlGroup from '../forms/FormControlGroup'
import FormWrapper from '../utils/FormWrapper'
import { ImagesContext } from '../../context/images-context'

const initialImageTextData = {
    imageName: '',
    price: '',
    description: '',
}

const ImageUpload = () => {
    const [filename, setFilename] = useState('Chose images...')
    const [mainImage, setMainImage] = useState(null)
    const [thumbnailImage, setThumbnailImage] = useState(null)
    const [imageTextData, setImageTextData] = useState({
        ...initialImageTextData,
    })

    const { uploadImage } = useContext(ImagesContext)

    const fileChangeHandler = e => {
        const thumbnail = e.target.files[0]
        const image = e.target.files[1]

        if (image && thumbnail) {
            setFilename(`${image.name}, ${thumbnail.name}`)
            setMainImage(image)
            setThumbnailImage(thumbnail)
        }

        e.target.value = null
    }

    const submitHandler = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('mainImage', mainImage)
        formData.append('thumbnailImage', thumbnailImage)
        formData.append('imageName', imageTextData.imageName)
        formData.append('price', imageTextData.price)
        formData.append('description', imageTextData.description)
        const uploadResult = await uploadImage(formData)
        console.log('uploadResult', uploadResult)
    }

    const changeHandler = e => {
        setImageTextData(previousImageTextData => {
            return { ...imageTextData, [e.target.name]: e.target.value }
        })
    }
    return (
        <Form
            style={{ maxWidth: '400px' }}
            onSubmit={submitHandler}
            className="d-flex m-auto"
        >
            <div className="w-100  mt-5">
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
                    name="imageName"
                    label="ImageName"
                    controlId="imageName"
                    value={imageTextData.imageName}
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
            </div>
        </Form>
    )
}

export default ImageUpload
