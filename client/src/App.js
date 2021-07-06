import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'

import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './components/layout/Header'
import AuthProvider from './context/auth-context'
import PrivateRoute from './components/utils/PrivateRoute'
import PublicRoute from './components/utils/PublicRoute'

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <PrivateRoute path="/me" component={Profile} />
                    <PublicRoute path="/signup" component={Signup} />
                    <PublicRoute path="/login" component={Login} />
                    <Route path="*">
                        <h1 className="display-4 text-center mt-5">
                            404 Page Not Found
                        </h1>
                    </Route>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
