const authRouter = require('./auth')

const routesArray = [
    {
        path: '/api/auth',
        route: authRouter,
    },
]

const routes = app => {
    routesArray.forEach(route => {
        app.use(route.path, route.route)
    })
}

module.exports = routes
