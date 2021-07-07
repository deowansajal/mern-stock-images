import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import Sidebar from '../components/layout/Sidebar'

const Profile = () => {
    const { user } = useContext(AuthContext)

    return (
        <div>
            <h1>Hekjkfjj</h1>
        </div>
    )
}

export default Profile
