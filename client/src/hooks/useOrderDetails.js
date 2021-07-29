import { useState, useEffect } from 'react'
import axios from 'axios'

const useOrderDetails = ({ url }) => {
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source()

        axios({
            url,
            cancelToken: cancelTokenSource.token,
        }).then(({ data }) => {
            setOrder(data.data.order)
        })

        return cancelTokenSource.cancel
    }, [url])
    return { order }
}

export default useOrderDetails
