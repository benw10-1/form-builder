const { AuthenticationError } = require('apollo-server-express')
const { User, Form, Response, Piece } = require("../../models")
const { signToken } = require('../../utils')
const defaultForm = require("../defaultForm")
const propReducer = require("../../utils/propReducer")

async function signup(parent, args, context) {
    if (await User.findOne({ name: args.name })) throw new Error("Username already taken")
    if (await User.findOne({ email: args.email })) throw new Error("Email already used")
    
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
    if (published && !form.piece_refs.length) throw new Error("No pieces in form")

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

    const parsedPieces = []
    for (const x of pieces) {
        if (!x.props || !x._type) throw new Error("No props or type passed to: " + x._type ?? "Untyped")

        if (x._id) {
            const piece = await Piece.findByIdAndUpdate(x._id, { ...x }).exec()
            if (!piece) throw new Error("Piece not found")
            parsedPieces.push(piece._id.toString())
        }
        else {
            const newPiece = await Piece.create({ _type: x._type, form_ref: id, props: x.props })
            parsedPieces.push(newPiece._id.toString())
            console.log("CREATED!")
        }
    }

    const refSet = new Set(parsedPieces)
    // console.log(refSet, parsedPieces)
    for (const x of form.piece_refs) {
        if (!refSet.has(x.toString())) {
            console.log("DEleted!")
            await Piece.findByIdAndDelete(x).exec()
        }
    }

    const updated = await Form.findOneAndUpdate({ _id: id }, { piece_refs: parsedPieces }).exec()

    return parsedPieces.map(x => x.toString())
}

async function respond(parent, { id, responses }, context) {
    const form = await Form.findById(id)
    if (!form) throw new Error("Form not found")
    if (!form.published) throw new Error("Form not published")

    const skipped = ["break", "header"]

    for (const x of responses) {
        const { key, value } = x
        // if (!key || !value || value === '' || key === '') throw new Error("No key or value passed to: " + key ?? "Untyped")
        const piece = await Piece.findById(key).exec()
        if (!piece) throw new Error("Piece not found")
        if (String(piece.form_ref) !== String(form._id)) throw new Error("Piece not in form")
        if (skipped.includes(piece._type)) {
            console.log("Skipping piece: " + piece._type)
            continue
        }
        const { qtype, qoptions, qtext } = propReducer(piece.props)

        if (qtype === "radio") {
            console.log(value, qoptions)
            if (!qoptions.includes(value)) throw new Error("Value not in options")
        }
        if (qtype === "check") {
            value.split("__sep__").forEach(x => {
                if (!qoptions.includes(x)) throw new Error("Value not in options")
            })
        }

        console.log("Found type " + qtype + " with text - " + qtext)
    }

    const newResponse = await Response.create({ form_ref: id, responses })

    return newResponse
}

async function deleteForm(parent, { id }, context) {
    if (!context.user) throw new AuthenticationError("Not logged in")
    const user = await User.findOne({ _id: context.user._id }).exec()
    if (!user) throw new AuthenticationError("Not logged in")

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