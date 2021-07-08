import React, { useState, useEffect, useCallback } from 'react'
import useHttp from '../hooks/useHttp'
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

const ImagesProvider = ({ children }) => {
    const [images, setImages] = useState([])
    const [error, setError] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const sendHttpRequest = useHttp()

    const getAllImages = useCallback(async () => {
        return await sendHttpRequest({
            url: '/api/images',
        })
    }, [sendHttpRequest])

    const getSingleImage = async imageId => {
        return await sendHttpRequest({
            url: `/api/images/${imageId}`,
        })
    }

    const uploadImage = async formData => {
        return await axios({
            method: 'post',
            url: '/api/admin/upload',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }
    const downloadImage = async imageId => {
        return await sendHttpRequest({
            url: `/api/images/${imageId}`,
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
    }

    return (
        <ImagesContext.Provider value={value}>
            {children}
        </ImagesContext.Provider>
    )
}

export default ImagesProvider
