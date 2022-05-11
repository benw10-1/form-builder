async function userID(parent, args, context, info) {
    console.log(context.session, context.session.userID)
    return context.session.userID
}

module.exports = { userID }