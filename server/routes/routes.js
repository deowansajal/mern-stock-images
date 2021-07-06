const authRoute = require('./authRoute')
const adminRoute = require('./adminRoute')

const routesArray = [
    {
        path: '/api/admin',
        route: adminRoute,
    },
    {
        path: '/api/auth',
        route: authRoute,
    },
]

const routes = app => {
    routesArray.forEach(route => {
        app.use(route.path, route.route)
    })
}

module.exports = routes
