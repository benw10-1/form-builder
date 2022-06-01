const { AuthenticationError } = require('apollo-server-express')
const { User, Form, Response, Piece } = require("../../models")
const { signToken } = require('../../utils')
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
    const user = await User.findOne({ _id: context.user._id }).exec()
    
    if (!user) new AuthenticationError("Not logged in!")
    // creates default form for use in editing
    const newForm = await defaultForm(title, user._id, description)
    return newForm
}

async function updateFormMeta(parent, { id, title, description }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const form = await Form.findById(id).exec()
    if (!form) throw new Error("Form not found")
    if (context.user._id !== String(form.creator)) throw new AuthenticationError("Not creator")

    const updated = await Form.findOneAndUpdate({ _id: id }, { title, description }).exec()

    return updated
}

async function setPublished(parent, { id, published }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const form = await Form.findById(id).exec()
    if (!form) throw new Error("Form not found")
    if (context.user._id !== String(form.creator)) throw new AuthenticationError("Not creator")

    let updated
    if (form.endpoint) updated = await Form.findOneAndUpdate({ _id: id }, { published }).exec()
    else updated = await Form.findOneAndUpdate({ _id: id }, { published, endpoint: form._id }).exec()

    return updated
}

async function updateFormPieces(parent, { id, pieces }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const form = await Form.findById(id)
    if (!form) throw new Error("Form not found")
    if (context.user._id !== String(form.creator)) throw new AuthenticationError("Not creator")

    const deleted = await Piece.deleteMany({ form_ref: id }).exec()

    const parsedPieces = []
    for (const x of pieces) {
        if (!x.props || !x._type) throw new Error("No props or type passed to: " + x._type ?? "Untyped")

        const newPiece = await Piece.create({ _type: x._type, form_ref: id, props: x.props })
        parsedPieces.push(newPiece._id)
    }

    const updated = await Form.findOneAndUpdate({ _id: id }, { piece_refs: parsedPieces }).exec()

    return updated
}

async function respond(parent, { id, responses }, context) {
    const form = await Form.findById(id)
    if (!form) throw new Error("Form not found")
    if (!form.published) throw new Error("Form not published")

    for (const x of responses) {
        const { key, value } = x
        if (!key || !value) throw new Error("No key or value passed to: " + key ?? "Untyped")
        const piece = await Piece.findById(key).exec()
        if (!piece) throw new Error("Piece not found")
        if (piece.form_ref !== form._id) throw new Error("Piece not in form")
        // if (piece._type === "singleselect") {
        //     if (!piece.props.some(y => y.value === value)) throw new Error(`Value ${value} not in piece ${key}`)
        // }
        // // if (piece._type === "multiselect") {
        // //     if (!piece.props.some(y => y.some(j => j === value))) throw new Error(`Value ${value} not in piece ${key}`)
        // // }
    }

    const newResponse = await Response.create({ form_ref: id, responses })

    return newResponse
}

async function deleteForm(parent, { id }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const user = await User.findOne({ _id: context.user._id }).exec()
    if (user) throw new AuthenticationError("Not logged in")

    const form = await Form.findById(id)
    if (!form) throw new Error("Form not found")
    if (context.user._id !== String(form.creator)) throw new AuthenticationError("Not creator")

    const deleted = await Form.findOneAndDelete({ _id: id }).exec()

    return deleted
}

module.exports = {
    signup,
    login,
    createForm,
    respond,
    updateFormMeta,
    updateFormPieces,
    setPublished,
    deleteForm
}