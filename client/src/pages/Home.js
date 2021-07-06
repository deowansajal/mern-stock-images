utimport axios from 'axios'

const Home = () => {
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
    return (
        <>
            <button onClick={load}>Fetch Image</button>

            <h1 className="display-4 text-center mt-4">Welcom to Home</h1>
        </>
    )
}

export default Home
