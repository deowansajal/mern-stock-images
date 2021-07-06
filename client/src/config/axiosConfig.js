import axios from 'axios'

const setAuthorizationHeader = () => {
    axios.interceptors.request.use(function (config) {
        const AUTH_TOKEN = localStorage.getItem('token')
        config.headers.common['Authorization'] = AUTH_TOKEN ? AUTH_TOKEN : null
        return config
    })
}

export default setAuthorizationHeader
