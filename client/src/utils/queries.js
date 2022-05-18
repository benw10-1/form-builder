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

async function getPiecesForRender(id) {
    const query = `
    query Query($id: ID!) {
        getPiecesForRender(id: $id) {
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
            result: data.getPiecesForRender
        }
    })
}

async function getResponsesByForm(id) {
    const query = `
    query Query($id: ID!) {
        getResponsesByForm(id: $id) {
            _id
            answers {
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

const exp = { getMe, getMyForms, getPiecesForRender, getResponsesByForm }

export default exp