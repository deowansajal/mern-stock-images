import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = React.useContext(AuthContext)
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

                return <Component {...props} />
            }}
        />
    )
}
export default PrivateRoute
