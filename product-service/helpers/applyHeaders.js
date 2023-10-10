const HEADERS_TO_APPLY = {
    'Access-Control-Allow-Origin': '*',
}

const applyHeaders = (responce) => {
    return {
        ...responce,
        headers: HEADERS_TO_APPLY
    }
}

export { 
    applyHeaders
}