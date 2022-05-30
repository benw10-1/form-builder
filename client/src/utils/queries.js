import genQuery from "./genQuery"

/**
 * Login status.
 * @returns null or user data.
 */
async function getMe() {
    const query = `
    query Query {
        getMe { 
            User {
                name
                email
            }
        }
    }
    `

    return genQuery(query).then(data => {
        if (data.__status__ === "error") return null
        return {
            __status__: data.__status__,
            ...data.getMe
        }
    })
}

/**
 * Get form data.
 * @returns formdata or null (not logged in)
 */

async function getMyForms() {
    const query = `
    query Query {
        getMyForms {
            _id
            title
            description
            endpoint
            published
            createdAt
        }
    }
    `

    return genQuery(query).then(data => {
        if (data.__status__ === "error") return null
        return {
            __status__: data.__status__,
            result: data.getMyForms
        }
    })
}

async function getPiecesByID(id) {
    const query = `
    query Query($id: ID!) {
        getPiecesByID(id: $id) {
            _id
            _type
            props {
                key
                value
            }
        }
    }
    `

    const variables = { "id": id }

    return genQuery(query, variables).then(data => {
        if (data.__status__ === "error") return null
        return {
            __status__: data.__status__,
            result: data.getPiecesByID
        }
    })
}

async function getPiecesByEndpoint(endpoint) {
    const query = `
    query Query($ep: String!) {
        getPiecesByEndpoint(ep: $ep) {
            _id
            _type
            props {
                key
                value
            }
        }
    }
    `

    const variables = { "ep": endpoint }

    return genQuery(query, variables).then(data => {
        if (data.__status__ === "error") return null
        return {
            __status__: data.__status__,
            result: data.getPiecesByEndpoint
        }
    })
}

async function getResponsesByForm(id) {
    const query = `
    query Query($id: ID!) {
        getResponsesByForm(id: $id) {
            _id
            responses {
                key
                value
            }
        }
    }
    `

    const variables = { "id": id }

    return genQuery(query, variables).then(data => {
        if (data.__status__ === "error") return null
        return {
            __status__: data.__status__,
            result: data.getResponsesByForm
        }
    })
}

async function getFormByID(id) {
    const query = `
    query Query($id: ID!) {
        getFormByID(id: $id) {
            _id
            title
            description
            endpoint
            published
            creator {
                _id
            }
            piece_refs
            createdAt
        }
    }
    `

    const variables = { "id": id }

    return genQuery(query, variables).then(data => {
        if (data.__status__ === "error") return null
        return {
            __status__: data.__status__,
            result: data.getFormByID
        }
    })
}

export default { getMe, getMyForms, getPiecesByID, getResponsesByForm, getPiecesByEndpoint }