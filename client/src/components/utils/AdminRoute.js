import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

const AdminRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, user } = React.useContext(AuthContext)
    return (
        <Route
            exact
            {...rest}
            render={({ location, ...props }) => {
                if (!isAuthenticated) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location },
                            }}
                        />
                    )
                }
                if (isAuthenticated && user.role && user.role !== 'admin') {
                    return (
                        <Redirect
                            to={{
                                pathname: '/me',
                                state: { from: location },
                            }}
                        />
                    )
                }

                return <Component {...props} />
            }}
        />
    )
}
export default AdminRoute
