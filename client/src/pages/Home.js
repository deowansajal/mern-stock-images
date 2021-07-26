import Images from '../components/images/Images'
import { Container } from 'react-bootstrap'
import ContainerWrapper from '../components/utils/ContainerWrapper'

const Home = () => {
    return (
        <ContainerWrapper>
            <Container fluid>
                <h1 className="display-4 text-center">Your Images</h1>
                <p className="lead text-center mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <Images />
            </Container>
        </ContainerWrapper>
    )
}

export default Home
