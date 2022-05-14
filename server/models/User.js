const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        forms: [{
            type: Schema.Types.ObjectId,
            ref: "Form"
        }]
    }
)

const User = model('User', userSchema)

module.exports = User