const authRoute = require('./authRoute')
const adminRoute = require('./adminRoute')
const imageRoute = require('./imageRoute')
const orderRoute = require('./orderRoute')

const routesArray = [
    {
        path: '/api/admin',
        route: adminRoute,
    },

    {
        path: '/api/auth',
        route: authRoute,
    },

    {
        path: '/api/images',
        route: imageRoute,
    },

    {
        path: '/api/orders',
        route: orderRoute,
    },
]

const routes = app => {
    routesArray.forEach(route => {
        app.use(route.path, route.route)
    })
}

module.exports = routes
