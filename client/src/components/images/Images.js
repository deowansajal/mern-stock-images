import React, { useContext, useEffect } from 'react'
import { ImagesContext } from '../../context/images-context'
import { Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import styles from './Images.module.css'

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
        <div className={`${styles['images-container']}`}>
            {images.map(({ thumbnailImage, id }) => {
                return (
                    <NavLink to={`${id}`}>
                        <Image
                            className="w-100 mb-4"
                            src={`uploads/${thumbnailImage.name}`}
                            alt={`${thumbnailImage.name}`}
                        />
                    </NavLink>
                )
            })}
        </div>
    )
}

export default Images
