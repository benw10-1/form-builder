import genQuery from "./genQuery"

/**
 * Login status.
 * @returns null or user data.
 */
async function getUserData() {
    const query = `
    query Query {
        thisUser { 
            user {
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
            ...data.thisUser
        }
    })
}

/**
 * Get form data.
 * @returns formdata or null (not logged in)
 */
async function getForms() {
    const query = `
    query Query {
        getForms
    }
    `

    return genQuery(query).then(data => {
        if (data.__status__ === "error") return null
        return {
            __status__: data.__status__,
            ...data.getForms
        }
    })
}

export default { getUserData, getForms }