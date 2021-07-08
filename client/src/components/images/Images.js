import React, { useContext, useEffect } from 'react'
import { ImagesContext } from '../../context/images-context'
import { Image, Col, Row, Container } from 'react-bootstrap'
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
            {images.map(({ thumbnail, _id: id }) => (
                <div style={{ maxWidth: 400 }}>
                    <NavLink to={`/${id}`}>
                        <Image
                            src={`uploads/${thumbnail}`}
                            className="w-100 "
                        />
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default Images
