const { Schema, model } = require('mongoose')
const bcrypt = require("bcrypt")

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

// compares password to hashed password
userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User