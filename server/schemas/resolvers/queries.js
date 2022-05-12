async function userID(parent, args, context, info) {
    return context.session.userID
}

module.exports = { userID }