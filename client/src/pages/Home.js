import Images from '../components/images/Images'
import { Container } from 'react-bootstrap'

const Home = () => {
    return (
        <Container>
            <h1 className="display-4 text-center mt-4">Welcom to Home</h1>
            <Images />
        </Container>
    )
}

export default Home
