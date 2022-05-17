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
    if (data.__status__ === "error") return data
    Auth.login(data.login.token)
    return {
      __status__: data.__status__,
      result: data.login
    }
  })
}

async function signup(name, email, password) {
  const variables = { name, email, password }
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
    if (data.__status__ === "error") return data
    Auth.login(data.signup.token)
    return {
      __status__: data.__status__,
      result: data.signup
    }
  })
}

async function createForm(title, description) {
  const variables = { title, description }
  const query = `
    mutation CreateForm($title: String!, $description: String) {
      createForm(title: $title, description: $description) {
        _id
        title
        description
        endpoint
        published
      }
    }      
    `

  return genQuery(query, variables).then(data => {
    if (data.__status__ === "error") return data
    return {
      __status__: data.__status__,
      result: data.createForm
    }
  })
}

export default { login, signup, createForm }