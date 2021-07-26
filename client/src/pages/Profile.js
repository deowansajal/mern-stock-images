import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import { ImagesContext } from '../context/images-context'

import SingleImage from '../components/images/SingleImage'
import styles from '../components/images/Images.module.css'
import ContainerWrapper from '../components/utils/ContainerWrapper'
import { Container } from 'react-bootstrap'

const Profile = () => {
    const { user, authorizedImages } = useContext(AuthContext)
    const { setCurrentImage } = useContext(ImagesContext)

    return (
        <ContainerWrapper>
            <Container fluid>
                <div className={styles['images-container']}>
                    {authorizedImages.map(image => (
                        <SingleImage
                            image={image}
                            key={image._id}
                            setCurrentImage={setCurrentImage}
                        />
                    ))}
                </div>
            </Container>
        </ContainerWrapper>
    )
}

export default Profile
