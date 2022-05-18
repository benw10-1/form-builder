const { Schema, model } = require('mongoose')
const Piece = require("./Piece")
const Response = require("./Response")

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
        // for custom endpoints later and shorter urls. If no endpoint, site has not been published yet, but persist endpoint even when user unpublishes. Fix unique constraint
        endpoint: {
            type: String,
            trim: true,
            index: {
                unique: true,
                partialFilterExpression: { "endpoint": { $type: "string" }}
            }
        },
        published: {
            type: Boolean,
            required: true
        },
        // faux one-to-one relationship (object reference)
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        // faux many-to-one relationship (nested object reference)
        piece_refs: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: "Piece"
            }],
            default: []
        }
    },
    {
        timestamps: true
    }
)

// cascade delete pieces and responses on form delete
formSchema.post('remove', function(doc) {
    // doc is the document being removed, and we are removing all pieces with a form with same ID
    Response.remove({ form_ref: doc._id }).exec()
    Piece.remove({ form_ref: doc._id }).exec()
})

const Form = model('Form', formSchema)

module.exports = Form