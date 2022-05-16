import genQuery from "./genQuery"
import Auth from "./auth"

async function login(login, password) {
const variables = { login, password }
    const query = `
    mutation Login($login: String!, $password: String!) {
      login(login: $login, password: $password) {
        token
        user {
          name
          email
        }
      }
    }
    `

    return genQuery(query, variables).then(data => {
      Auth.login(data.login.token)
      return {
        __status__: data.__status__,
        ...data.login
      }
    })
}

async function signup(username, email, password) {
    const variables = { username, email, password }
    const query = `
    mutation Signup($name: String!, $password: String!, $email: String!) {
      signup(name: $name, password: $password, email: $email) {
        token
        user {
          name
          email
        }
      }
    }      
    `

    return genQuery(query, variables).then(data => {
      Auth.login(data.signup.token)
      return {
        __status__: data.__status__,
        ...data.signup
      }
    })
}

export default { login, signup }