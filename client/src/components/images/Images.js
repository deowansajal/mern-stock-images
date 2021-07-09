import React, { useContext } from 'react'
import { ImagesContext } from '../../context/images-context'
import SingleImage from './SingleImage'

import styles from './Images.module.css'

const Images = () => {
    const { images } = useContext(ImagesContext)

    if (images.length === 0) {
        return <p>There is no images</p>
    }
    return (
        <div className={`${styles['images-container']}`}>
            {images.map(({ thumbnail, _id: id, name }) => (
                <SingleImage
                    key={id}
                    thumbnail={thumbnail}
                    id={id}
                    name={name}
                />
            ))}
        </div>
    )
}

export default Images
