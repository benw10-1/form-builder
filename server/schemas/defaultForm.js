const { Form, Piece } = require("../models")

async function defaultPieces(title, form_ref, description) {
    let header = await Piece.create({
        _type: "header",
        form_ref,
        props: [
            { key: "title", value: title },
            { key: "subtitle", value: description },
        ]
    })
    let exQuestion = await Piece.create({
        _type: "question",
        form_ref,
        props: [
            { key: "qtext", value: "Some question?" },
            { key: "qsubtext", value: "Some desc" },
            { key: "qtype", value: "multiple" },
            { key: "qoptions", value: "Option 1" },
            { key: "qoptions", value: "Option 2" },
            { key: "qoptions", value: "ANOTHER ONE" },
            { key: "qoptions", value: "Option 4" },
        ]
    })

    return [header._id, exQuestion._id]
}

async function defaultForm(title, creator, description) {
    const formObj = {
        title,
        creator,
        description,
        published: false
    }

    const newForm = await Form.create(formObj)

    //let piece_refs = await defaultPieces(title, newForm._id, description)

    //const uptForm = await Form.findOneAndUpdate({ _id: newForm._id }, { piece_refs })

    //console.log(uptForm)

    //return uptForm

    return newForm
}

module.exports = defaultForm