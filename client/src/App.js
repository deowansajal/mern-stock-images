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
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import ImagesProvider from './context/images-context'
const App = () => {
    return (
        <AuthProvider>
            <ImagesProvider>
                <BrowserRouter>
                    <Header />
                    <main>
                        <Switch>
                            <PublicRoute
                                exact
                                path="/"
                                component={Home}
                                restricted={false}
                            />

                            <PublicRoute
                                path="/signup"
                                component={Signup}
                                restricted={true}
                            />

                            <PublicRoute
                                path="/login"
                                component={Login}
                                restricted={true}
                            />

                            <PublicRoute
                                restricted={false}
                                path="/cart"
                                component={Cart}
                            />

                            <PrivateRoute path="/me" component={Profile} />
                            <PrivateRoute path="/admin" component={Admin} />

                            <PrivateRoute
                                path="*"
                                component={NotFound}
                                restricted={false}
                            />
                        </Switch>
                    </main>
                </BrowserRouter>
            </ImagesProvider>
        </AuthProvider>
    )
}

export default App
