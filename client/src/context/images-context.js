import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const initialImagesContext = {
    images: [],
    isLoading: false,
    isRequestSuccess: false,
    statusCode: 200,
    errorMessage: '',
    successMessage: '',
    error: {},
    getAllImages: () => {},
    getSingleImage: () => {},
    uploadImage: () => {},
    downloadImage: () => {},
}

export const ImagesContext = React.createContext(initialImagesContext)

const getCurrentImage = () => {
    const image = localStorage.getItem('currentImage')

    if (!image) {
        return {}
    }

    return JSON.parse(image)
}

const ImagesProvider = ({ children }) => {
    const [images, setImages] = useState([])
    const [error, setError] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentImageId, setCurrentImageId] = useState('')
    const [currentImage, setCurrentImage] = useState(getCurrentImage())

    const getAllImages = useCallback(async () => {
        return await axios({
            url: '/api/images',
        })
    }, [])

    const getSingleImage = async imageId => {
        return await axios({
            url: `/api/images/${imageId}`,
            params: { id: imageId },
        })
    }

    const uploadImage = async (formData, imageId) => {
        const options = {
            method: 'post',
            url: '/api/admin/upload',
            data: formData,
            params: {},
            headers: { 'Content-Type': 'multipart/form-data' },
        }

        if (imageId) {
            options.params.imageId = imageId
        }

        return await axios(options)
    }
    const downloadImage = imageId => {
        axios({
            url: `/api/images/download/${imageId}`,
        })
            .then(({ data }) => {
                let link = document.createElement('a')
                link.href = data.data.oneTimeDownloadLink
                link.download = data.data.oneTimeDownloadLink
                link.click()
            })
            .catch(err => {
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            })
    }

    useEffect(() => {
        const loadImages = async () => {
            const { data } = await getAllImages()
            setImages(data.images)
            setImages(data.images)
        }
        loadImages()
    }, [getAllImages, setImages])

    const value = {
        images,
        setImages,
        getAllImages,
        getSingleImage,
        uploadImage,
        downloadImage,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
        isLoading,
        setIsLoading,
        currentImageId,
        currentImage,
        setCurrentImage,
        setCurrentImageId,
    }

    return (
        <ImagesContext.Provider value={value}>
            {children}
        </ImagesContext.Provider>
    )
}

export default ImagesProvider
