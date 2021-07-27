import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './components/layout/Header'
import PrivateRoute from './components/utils/PrivateRoute'
import AdminRoute from './components/utils/AdminRoute'
import PublicRoute from './components/utils/PublicRoute'
import Admin from './pages/Admin'
import Customers from './pages/Customers'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import ImageDetails from './pages/ImageDetails'
import Footer from './components/layout/Footer'
import Order from './pages/Order'
import OrderDetails from './pages/OrderDetails'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <main style={{ minHeight: 'calc(100vh - 70px)' }}>
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

                        <Route path="/success" component={Home} />

                        <PublicRoute
                            exact
                            path="/images/:id"
                            component={ImageDetails}
                            restricted={false}
                        />

                        <PrivateRoute exact path="/me" component={Profile} />
                        <PrivateRoute
                            exact
                            path="/me/orders"
                            component={Order}
                        />
                        <PrivateRoute
                            path="/me/orders/:id"
                            component={OrderDetails}
                        />

                        <AdminRoute path="/admin" component={Admin} />
                        <AdminRoute
                            path="/admin/customers"
                            component={Customers}
                        />

                        <Route path="*" component={NotFound} />
                    </Switch>
                </main>
            </BrowserRouter>

            <Footer />
        </>
    )
}

export default App
