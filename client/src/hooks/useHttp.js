import { useCallback } from 'react'

import axios from 'axios'

const useHttp = () => {
    return useCallback(async options => {
        return await axios({
            method: 'get',
            ...options,
        })
    }, [])
}

export default useHttp
