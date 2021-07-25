import React, { useContext } from 'react'
import { ImagesContext } from '../../context/images-context'
import SingleImage from './SingleImage'

import styles from './Images.module.css'

const Images = () => {
    const { images, setCurrentImage } = useContext(ImagesContext)

    if (images.length === 0) {
        return <p>There is no images</p>
    }
    return (
        <div className={`${styles['images-container']}`}>
            {images.map(image => (
                <SingleImage
                    image={image}
                    key={image._id}
                    setCurrentImage={setCurrentImage}
                />
            ))}
        </div>
    )
}

export default Images
