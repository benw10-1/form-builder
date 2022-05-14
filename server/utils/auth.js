const jwt = require('jsonwebtoken')
require("dotenv").config()

const expiration = '2h'

module.exports = {
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization

        if (req.headers.authorization) token = token.split(' ').pop().trim()

        if (!token) return req

        try {
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
