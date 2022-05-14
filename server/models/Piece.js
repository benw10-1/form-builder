const { Schema, model } = require('mongoose')

const pieceSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        _type: {
            type: String,
            enum: ["header", "part", "break"],
            trim: true,
            required: true
        },
        // faux one-to-one relationship (object reference)
        form: {
            type: Schema.Types.ObjectId,
            ref: "Form",
            required: true
        },
        // formless data for manual processing
        data: {
            type: Object,
            required: true
        }
    }
)

const Piece = model('Piece', pieceSchema)

module.exports = Piece