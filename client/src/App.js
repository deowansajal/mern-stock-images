import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './components/layout/Header'
import AuthProvider from './context/auth-context'
import PrivateRoute from './components/utils/PrivateRoute'
import AdminRoute from './components/utils/AdminRoute'
import PublicRoute from './components/utils/PublicRoute'
import Admin from './pages/Admin'
import Customers from './pages/Customers'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import ImagesProvider from './context/images-context'
import ImageDetails from './pages/ImageDetails'
import Checkout from './pages/Checkout'
import Footer from './components/layout/Footer'

const App = () => {
    return (
        <>
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
                                    exact
                                    restricted={false}
                                    path="/cart"
                                    component={Cart}
                                />

                                <Route
                                    path="/cart/checkout"
                                    component={Checkout}
                                />

                                <PublicRoute
                                    exact
                                    path="/images/:id"
                                    component={ImageDetails}
                                    restricted={false}
                                />

                                <PrivateRoute path="/me" component={Profile} />

                                <AdminRoute path="/admin" component={Admin} />
                                <AdminRoute
                                    path="/admin/customers"
                                    component={Customers}
                                />

                                <Route path="*" component={NotFound} />
                            </Switch>
                        </main>
                    </BrowserRouter>
                </ImagesProvider>
            </AuthProvider>
            <Footer />
        </>
    )
}

export default App
