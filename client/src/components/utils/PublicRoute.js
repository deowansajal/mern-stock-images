import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = React.useContext(AuthContext)
    return (
        <Route
            exact
            path
            {...rest}
            render={props =>
                !isAuthenticated ? (
                    <Component props={props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/me',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute
