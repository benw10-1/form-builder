const { Schema, model } = require('mongoose')

const responseSchema = new Schema(
    {
        form_ref: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        responses: [{
            type: Object,
            required: true
        }]
    }
)

const Response = model('Response', responseSchema)

module.exports = Response