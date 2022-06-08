import Auth from "./auth"

/**
 * Utility function for generating gql requests
 * @param {String} q GraphQL query
 * @param {String[]} variables GraphQL variables to pass
 * @returns Builds the request for gql. 
 */
 async function genQuery(q, variables) {
    // const url = "/graphql"
    const url = "/graphql"
    // https://graphql.org/learn/serving-over-http/#post-request
    const body = {
        "query": q,
        variables
    }

    let token = Auth.getToken()

    if (token && Auth.isTokenExpired(token)) {
        Auth.logout()
        return
    }
    
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
            with: q,
            errors: data.errors.reduce((acc, cur) => {
                if (cur.message === "Incorrect password") {
                    acc.pass = cur.message
                }
                else if (cur.message === "No user found") {
                    acc.user = "User not found"
                }
                else if (cur.message === "Username already taken") {
                    acc.user = "Username already taken"
                }
                else if (cur.message === "Email already used") {
                    acc.email = "Email already used"
                }
                else if (cur.message === "Not logged in") {
                    Auth.logout()
                }
                else if (cur.message === "Not creator") {
                    window.location.assign("/dashboard")
                }
                else {
                    acc.rest.push(cur)
                }
                return acc
            }, { rest: [] })
        }
        // otherwise success
        return {
            __status__: "success",
            ...data.data
        }
    }).then(data => {
        console.log(data)
        return data
    }).catch(err => {
        console.log(err)
        return err
    })
}

export default genQuery