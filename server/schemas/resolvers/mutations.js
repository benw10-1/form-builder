const { AuthenticationError } = require('apollo-server-express')
const { User, Form, Response, Piece } = require("../../models")
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

async function updateFormMeta(parent, { id, title, description }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const form = await Form.findById(id)
    if (!form) throw new Error("Form not found")
    if (context.user._id !== form.creator) throw new AuthenticationError("Can't access by ID")

    const updated = await Form.updateOne({ _id: id }, { title, description }).exec()

    return updated
}

async function updateFormPieces(parent, { id, pieces }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const form = await Form.findById(id)
    if (!form) throw new Error("Form not found")
    if (context.user._id !== form.creator) throw new AuthenticationError("Can't access by ID")

    const parsedPieces = []
    pieces.forEach(async (x) => {
        if (!x.props) throw new Error("No props passed to: " + x._type ?? "Untyped")
        // if existing piece
        if (x._id) {
            const updated = await Piece.updateOne({ _id: x._id }, { props: x.props }).exec()

            if (updated) return updated._id
        }
        // if cant find piece or no id passed create a new piece
        const newPiece = await Piece.create({ form_ref: id, props: x.props })

        return newPiece._id
    })

    const updated = await Form.updateOne({ _id: id }, { piece_refs: parsedPieces }).exec()

    return updated
}

async function respond(parent, { id, responses }, context) {
    const form = await Form.findById(id)
    if (!form) throw new Error("Form not found")
    if (!form.published) throw new Error("Form not published")

    const newResponse = await Response.create({ form_ref: id, responses })

    return newResponse
}

module.exports = {
    signup,
    login,
    createForm,
    respond,
    updateFormMeta,
    updateFormPieces
}