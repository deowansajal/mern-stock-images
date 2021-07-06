import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'

const Profile = () => {
    const { user } = useContext(AuthContext)

    return (
        <div>
            {user.name}
            djfjf
        </div>
    )
}

export default Profile
