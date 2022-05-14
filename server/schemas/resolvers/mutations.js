const bcrypt = require("bcrypt")
const { AuthenticationError } = require('apollo-server-express')
const { User } = require("../../models")
const { signToken } = require('../../utils/auth')

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

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new AuthenticationError("Incorrect password")

    const token = signToken(user)

    return { token, user }
}

module.exports = {
    signup,
    login
}