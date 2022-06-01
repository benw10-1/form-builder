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
    if (context.user._id !== String(form.creator)) throw new AuthenticationError("Not creator")

    const updated = await Form.updateOne({ _id: id }, { title, description }).exec()

    return updated
}

async function setPublished(parent, { id, publish }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const form = await Form.findById(id)
    if (!form) throw new Error("Form not found")
    if (context.user._id !== String(form.creator._id)) throw new AuthenticationError("Not creator")

    const updated = await Form.updateOne({ _id: id }, { published: publish }).exec()

    return updated
}

async function updateFormPieces(parent, { id, pieces }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const form = await Form.findById(id)
    if (!form) throw new Error("Form not found")
    if (context.user._id !== String(form.creator)) throw new AuthenticationError("Not creator")

    const parsedPieces = []
    for (const x of pieces) {
        /*
        if (!x.props || !x._type) throw new Error("No props or type passed to: " + x._type ?? "Untyped")
        if (x._id) {
            const updated = await Piece.updateOne({ _id: x._id }, { props: x.props }).exec()

            if (updated) {
                parsedPieces.push(updated._id)
                continue
            }
        }
        */

        const newPiece = await Piece.create({ _type: x._type, form_ref: id, props: x.props })
        parsedPieces.push(newPiece._id)
    }
/*
    const parsedSet = Set(parsedPieces)

    // SUGGESTED BY GITHUB COPILOT XD (delete all pieces that are not in parsedSet) this comment was also suggested by github copilot. <- here too!
    for (const x of form.pieces) {
        if (!parsedSet.has(x)) await Piece.deleteOne({ _id: x })
    }
*/
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
    updateFormPieces,
    setPublished
}