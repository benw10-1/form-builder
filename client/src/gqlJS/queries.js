import genQuery from "./genQuery"

/**
 * Login status.
 * @returns null or userID.
 */
async function loginStatus() {
    const query = `
    query Query {
      userID
    }
    `

    return genQuery(query).then(data => {
        if (data.__status__ === "error") return false
        return data.userID
    })
}

export default { loginStatus }