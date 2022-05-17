const { Schema, model } = require('mongoose')

const pieceSchema = new Schema(
    {
        _type: {
            type: String,
            enum: ["header", "question", "break"],
            trim: true,
            required: true
        },
        // faux one-to-one relationship (object reference)
        form_ref: {
            type: Schema.Types.ObjectId,
            // ref: "Form"
        },
        // formless data for manual processing
        props: [{
            type: Object,
            required: true
        }]
    }
)

const Piece = model('Piece', pieceSchema)

module.exports = Piece