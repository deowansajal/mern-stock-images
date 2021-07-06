import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated } = React.useContext(AuthContext)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}
export default PrivateRoute
