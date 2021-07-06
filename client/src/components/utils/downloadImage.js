import axios from 'axios'

let load = async () => {
    axios({
        method: 'get',
        url: '/api/download',
    }).then(function (response) {
        console.log(response.data)
        let link = document.createElement('a')
        link.href = response.data.url
        link.download = response.data.url
        link.click()
    })
}
