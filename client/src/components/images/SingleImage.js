import { useState } from 'react'
import Image from 'react-bootstrap/Image'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import Icon from '../utils/Icon'

const RoundedIconWrapper = ({ className, style, children }) => {
    const classes = classNames({
        'rounded-circle d-flex justify-content-center align-items-center': true,
        [className]: className,
    })

    return (
        <div
            className={classes}
            style={{
                width: 40,
                height: 40,
                color: '#000',
                backgroundColor: '#fff',
                ...style,
            }}
        >
            {children}
        </div>
    )
}

const SingleImage = ({ id, thumbnail, name, price, setCurrentImage }) => {
    const [imageContentIsShown, setImageContentIsShown] = useState(false)

    const mouseEnterHandler = e => setImageContentIsShown(true)
    const mouseLeaveHandler = e => setImageContentIsShown(false)

    const clickHandler = () => {
        const currentImage = { id, name, price, thumbnail }
        setCurrentImage(currentImage)
        localStorage.setItem('currentImage', JSON.stringify(currentImage))
    }

    return (
        <NavLink
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            to={`/images/${id}`}
            className="text-light"
            onClick={clickHandler}
        >
            <div
                style={{ maxWidth: 400 }}
                className="position-relative  mb-3"
                key={id}
            >
                {imageContentIsShown && (
                    <div className="position-absolute">
                        <p className="lead text-center p-3">{name}</p>
                    </div>
                )}

                <Image src={`uploads/${thumbnail}`} className="w-100" />

                {imageContentIsShown && (
                    <div
                        className="position-absolute w-100"
                        style={{ bottom: 20 }}
                    >
                        <div className="w-100 d-flex  justify-content-center">
                            <RoundedIconWrapper className="mr-4">
                                <Icon name="zoom_in" style={{ fontSize: 28 }} />
                            </RoundedIconWrapper>

                            <RoundedIconWrapper>
                                <Icon
                                    name="file_download"
                                    style={{ fontSize: 28 }}
                                />
                            </RoundedIconWrapper>
                        </div>
                    </div>
                )}
            </div>
        </NavLink>
    )
}

export default SingleImage
