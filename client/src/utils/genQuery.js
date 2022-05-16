import Auth from "./auth"

/**
 * Utility function for generating gql requests
 * @param {String} q GraphQL query
 * @param {String[]} variables GraphQL variables to pass
 * @returns Builds the request for gql. 
 */
async function genQuery(q, variables) {
    const url = "/graphql"
    // https://graphql.org/learn/serving-over-http/#post-request
    const body = {
        "query": q,
        variables
    }

    let token = localStorage.getItem('id_token')
    console.log(token)
    // if (token) token = Auth.isTokenExpired(token) ? null : token
    
    // fetch options
    const opt = {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "authentication": token ? `Bearer ${token}` : ''
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
    }

    return fetch(url, opt).then(data => data.json()).then(data => {
        // checks for errors in gql(not server or network)
        // TODO: network error handler
        if (data.errors) return {
            __status__: "error",
            errors: data.errors
        }
        // otherwise success
        return {
            __status__: "success",
            ...data.data
        }
    }).then(data => {
        console.log(data)
        return data
    })
}

export default genQuery