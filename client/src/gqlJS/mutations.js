const genQuery = require("./genQuery")

async function login(login, password) {
    const variables = { login, password }
    const query = `
    mutation Login($login: String!, $password: String!) {
      login(login: $login, password: $password) {
        name
        email
      }
    }
    `

    return genQuery(query, variables)
}

async function signup(username, email, password) {
    const variables = { username, email, password }
    const query = `
    mutation Signup($name: String!, $password: String!, $email: String!) {
      signup(name: $name, password: $password, email: $email) {
        name
        email
      }
    }      
    `

    return genQuery(query, variables)
}

async function logout() {
    const query = `
    mutation Logout {
        logout
    }
    `

    return genQuery(query)
}

module.exports = { login, signup, logout }