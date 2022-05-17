const jwt = require('jsonwebtoken')
require("dotenv").config()

const expiration = '2h'

module.exports = {
    authMiddleware: function ({ req }) {
        // get token from header, body, or query
        let token = req.headers.authentication || req.body.token || req.query.token
        // get actual token part minus Bearer
        if (req.headers.authentication) token = token.split(' ').pop().trim()

        // guard clause
        if (!token) return req

        try {
            // verify that no changes have been make to the token
            const { data } = jwt.verify(token, process.env.SECRET, { maxAge: expiration })
            req.user = data
        } catch {
            console.log('Invalid token')
        }

        return req
    },
    signToken: function ({ login, username, _id }) {
        const payload = { login, username, _id }
        return jwt.sign({ data: payload }, process.env.SECRET, { expiresIn: expiration })
    },
}
