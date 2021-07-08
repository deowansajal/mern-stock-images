import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { isAuthenticated } = React.useContext(AuthContext)
    return (
        <Route
            exact
            {...rest}
            render={({ location, ...props }) =>
                isAuthenticated && restricted ? (
                    <Redirect
                        to={{
                            pathname: '/admin',
                            state: { from: location },
                        }}
                    />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default PublicRoute
