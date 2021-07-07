import React, { useContext, useEffect, useCallback } from 'react'
import { ImagesContext } from '../../context/images-context'

const Images = () => {
    const { images, getAllImages, setImages } = useContext(ImagesContext)

    useEffect(() => {
        const loadImages = async () => {
            const { data } = await getAllImages()
            setImages(data.images)
            setImages(data.images)
        }
        loadImages()
    }, [getAllImages, setImages])

    if (images.length === 0) {
        return <p>There is no images</p>
    }
    return (
        <div>
            {images.map(({ thumbnailImage }, index) => {
                return (
                    <img
                        src={`uploads/${thumbnailImage.name}`}
                        alt={`${thumbnailImage.name}`}
                    />
                )
            })}
        </div>
    )
}

export default Images
