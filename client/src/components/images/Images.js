import React, { useContext, useEffect } from 'react'
import { ImagesContext } from '../../context/images-context'
import Image from 'react-bootstrap/Image'
import { NavLink } from 'react-router-dom'

import styles from './Images.module.css'

const Images = () => {
    const { images } = useContext(ImagesContext)

    if (images.length === 0) {
        return <p>There is no images</p>
    }
    return (
        <div className={`${styles['images-container']}`}>
            {images.map(({ thumbnail, _id: id }) => (
                <div style={{ maxWidth: 400 }} className="mb-3" key={id}>
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
