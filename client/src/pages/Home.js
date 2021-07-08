import Images from '../components/images/Images'
import { Container } from 'react-bootstrap'

const Home = () => {
    return (
        <Container fluid style={{ marginTop: '5rem' }}>
            <h1 className="display-4 text-center">Your Images</h1>
            <p className="lead text-center mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <Images />
        </Container>
    )
}

export default Home
