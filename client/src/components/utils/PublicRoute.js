import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { isAuthenticated } = React.useContext(AuthContext)
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated && restricted ? (
                    <Redirect to="/me" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default PublicRoute
