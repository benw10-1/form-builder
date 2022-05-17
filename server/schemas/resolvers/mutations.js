const { AuthenticationError } = require('apollo-server-express')
const { User, Form } = require("../../models")
const { signToken } = require('../../utils/auth')
const defaultForm = require("../defaultForm")

async function signup(parent, args, context) {
    const user = await User.create({ ...args })
    const token = signToken(user)
    return { token, user }
}

async function login(parent, { login, password }) {
    const user = await User.findOne({
        $or: [
            { name: login },
            { email: login }
        ]
    })

    if (!user) throw new AuthenticationError("No user found")

    const valid = await user.isValidPassword(password)
    if (!valid) throw new AuthenticationError("Incorrect password")

    const token = signToken(user)

    return { token, user }
}

async function createForm(parent, { title, description }, context) {
    const user = await User.findOne({ _id: context.user._id })
    
    if (!user) new AuthenticationError("Not logged in!")
    // creates default form for use in editing
    const newForm = await defaultForm(title, user._id, description)

    return newForm
}

async function updateForm(parent, { id, form }, context) {
    // not implemented yet
}

async function respond(parent, { id, ...args }, context) {
    // not implemented yet
}

module.exports = {
    signup,
    login,
    createForm,
}