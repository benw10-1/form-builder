const { Schema, model } = require('mongoose')

const formSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        // faux one-to-one relationship (object reference)
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        // faux many-to-one relationship (nested object reference)
        pieces: [{
            type: Schema.Types.ObjectId,
            ref: "Piece"
        }]
    }
)

const Form = model('Form', formSchema)

module.exports = Form