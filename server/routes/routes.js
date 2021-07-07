const authRoute = require('./authRoute')
const adminRoute = require('./adminRoute')
const imageRoute = require('./imageRoute')

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
]

const routes = app => {
    routesArray.forEach(route => {
        app.use(route.path, route.route)
    })
}

module.exports = routes
