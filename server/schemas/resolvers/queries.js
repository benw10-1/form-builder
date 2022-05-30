const { User, Form, Piece, Response } = require("../../models")
const { AuthenticationError } = require('apollo-server-express')

async function getMe(parent, args, context) {
    // get user and also return full forms object
    if (context.user) {
        let user = await User.findOne({ _id: context.user._id })
        delete user.password
        return user
    }
    throw new AuthenticationError("Not logged in")
}

async function getMyForms(parent, args, context) {
    // guard clause for cached login
    if (!context.user) throw new AuthenticationError("Not logged in")
    const user = await User.findOne({ _id: context.user._id })

    const forms = await Form.find({ creator: user._id })

    return forms
}

async function getFormByID(parent, { id }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const user = await User.findOne({ _id: context.user._id })
    if (!user) throw new AuthenticationError("Incorrect id")

    const form = await Form.findOne({ _id: id })
    if (form && context.user._id !== String(form.creator)) throw new AuthenticationError("Not creator")

    return form
}

async function getPiecesByID(parent, { id }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const form = await Form.findById(id).populate("piece_refs")
    if (!form) throw new Error("Form not found")

    if (context.user._id !== String(form.creator)) throw new AuthenticationError("Can't access by ID")
    
    return form.piece_refs
}

async function getPiecesByEndpoint(parent, { endpoint }, context) {
    const form = await Form.findOne({ "endpoint": endpoint }).populate("piece_refs")
    if (!form) throw new Error("Form not found")
    if (!form.published) throw new Error("Form not published")

    return form.piece_refs
}

async function getResponsesByForm(parent, { id }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const user = await User.findOne({ _id: context.user._id })
    if (!user) throw new AuthenticationError("Incorrect id")

    const form = await Form.findOne({ _id: id })
    if (!form) throw new AuthenticationError("Form not found")
    if (context.user._id !== String(form.creator)) throw new AuthenticationError("Not creator")

    const responses = await Response.find({ form_ref: id })

    return responses
}


module.exports = { getFormByID, getMe, getMyForms, getResponsesByForm, getPiecesByID, getPiecesByEndpoint }