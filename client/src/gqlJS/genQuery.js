async function genQuery(q, variables) {
    const url = "/graphql"
    const body = {
        "query": q,
        variables
    }
    const opt = {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
    }

    return fetch(url, opt).then(data => data.json())
}

module.exports = genQuery