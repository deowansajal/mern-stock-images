const convertQueryStringToObject = search => {
    let newSearch
    if (search && typeof search === 'string') {
        newSearch = search.substring(1)

        const queryObject = JSON.parse(
            '{"' +
                decodeURI(newSearch)
                    .replace(/"/g, '\\"')
                    .replace(/&/g, '","')
                    .replace(/=/g, '":"') +
                '"}'
        )

        return queryObject
    }
    return {}
}

export default convertQueryStringToObject
