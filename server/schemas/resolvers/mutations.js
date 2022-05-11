const bcrypt = require("bcrypt")
const { User } = require("../../models")

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)

    const user = await User.create({ ...args, password })

    context.session.userID = user.id
    console.log(context.session.userID)

    return user
}

async function login(parent, args, context, info) {
    const user = await User.findOne({
        $or: [
            { name: args.login },
            { email: args.login }
        ]
    })
    if (!user) throw new Error("No user found")

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) throw new Error("Wrong password")

    context.session.userID = user.id
    console.log(context.session, context.session.userID)

    return user
}

module.exports = {
    signup,
    login
}