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
            {images.map(({ thumbnail, _id: id, name, price }) => (
                <SingleImage
                    key={id}
                    price={price}
                    thumbnail={thumbnail}
                    id={id}
                    name={name}
                    setCurrentImage={setCurrentImage}
                />
            ))}
        </div>
    )
}

export default Images
