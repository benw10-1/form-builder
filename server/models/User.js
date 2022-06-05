const { Schema, model } = require('mongoose')
const bcrypt = require("bcrypt")
const Form = require("./Form")

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
        }
    }
)

// hook that hashes created password before saved to DB
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})

userSchema.post('remove', function(doc) {
    // doc is the document being removed, and we are removing all pieces with a form with same ID
    Form.remove({ creator: doc._id }).exec()
})

// compares password to hashed password
userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User