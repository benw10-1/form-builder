const { User, Form, Piece, Response } = require("../../models")
const { AuthenticationError } = require('apollo-server-express')

async function getMe(parent, args, context) {
    // get user and also return full forms object
    if (context.user) {
        let user = await User.findOne({ _id: context.user._id }).populate("forms")
        delete user.password
        return user
    }
    throw new AuthenticationError("Not logged in")
}

async function getMyForms(parent, args, context) {
    // guard clause for cached login
    console.log(context.user)
    if (!context.user) throw new AuthenticationError("Not logged in")
    const user = await User.findOne({ _id: context.user._id })

    const forms = await Form.find({ creator: user._id })

    return forms
}

async function getPiecesForRender(parent, { id }, context) {
    return (await Form.findById(id).populate("piece_refs")).piece_refs
}

async function getResponsesByForm(parent, { id }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const user = await User.findOne({ _id: context.user._id })
    if (!user) throw new AuthenticationError("Incorrect id")

    const form = await Form.findOne({ _id: id })
    if (!form) throw new AuthenticationError("Form not found")
    if (form.creator !== user._id) throw new AuthenticationError("Not creator")

    const responses = await Response.find({ form_ref: id })
    console.log(responses)

    return responses
}


module.exports = { getMe, getMyForms, getResponsesByForm, getPiecesForRender }