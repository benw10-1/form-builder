import genQuery from "./genQuery"
import Auth from "./auth"
import { parseProps, unparseProps } from "./parseProps"

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
/**
 * 
 * @param {*} id Form id to respond to
 * @param {*} responses Can be array or object, will parse array
 * @returns Response object created
 */
async function respond(id, responses) {
 
  /*[{key: pieceid, value: ""},{key: pieceid, value: ["",""]},]*/

  const variables = { id, responses }
  const query = `
    mutation Respond($id: ID!, $responses: [PropInp]!) {
      respond(id: $id, responses: $responses) {
        _id
        form_ref
        responses {
          key
          value
        }
      }
    }      
    `

  return genQuery(query, variables).then(data => {
    if (data.__status__ === "error") return data
    return {
      __status__: data.__status__,
      result: data.respond
    }
  })
}

async function updateFormMeta(id, title, description) {
  const variables = { id, title, description }
  const query = `
    mutation UpdateFormMeta($id: ID!, $title: String!, $description: String)) {
      updateFormMeta(id: $id, title: $title, description: $description) {
        _id
        title
        description
        piece_refs
      }
    }      
    `

  return genQuery(query, variables).then(data => {
    if (data.__status__ === "error") return data
    return {
      __status__: data.__status__,
      result: data.updateFormMeta
    }
  })
}

async function updateFormPieces(id, pieces) {
  const query = `
    mutation UpdateFormPieces($id: ID!, $pieces: [PieceInp!]!) {
      updateFormPieces(id: $id, pieces: $pieces) 
    }      
    `
  const variables = { id, pieces }

  return genQuery(query, variables).then(data => {
    if (data.__status__ === "error") return data
    return {
      __status__: data.__status__,
      result: data.updateFormPieces
    }
  })
}

async function setPublished(id, published) {
  const variables = { id, published }
  const query = `
    mutation SetPublished($id: ID!, $published: Boolean!) {
      setPublished(id: $id, published: $published) {
        _id
        title
        description
        published
        endpoint
      }
    }
    `

  return genQuery(query, variables).then(data => {
    if (data.__status__ === "error") return data
    return {
      __status__: data.__status__,
      result: data.setPublished
    }
  })
}

async function deleteForm(id) {
  const variables = { id }
  const query = `
    mutation DeleteForm($id: ID!) {
      deleteForm(id: $id) {
        _id
        title
      }
    }
    `

  return genQuery(query, variables).then(data => {
    if (data.__status__ === "error") return data
    return {
      __status__: data.__status__,
      result: data.deleteForm
    }
  })
}

export default { login, signup, createForm, respond, updateFormMeta, updateFormPieces, setPublished, deleteForm }