const jwt = require('jsonwebtoken')
require("dotenv").config()

const expiration = '1h'

const inMemoryIPS = {}
const sweepTimer = setInterval(() => {
    const now = Date.now()
    Object.keys(inMemoryIPS).forEach(ip => {
        if (now - 5000 > inMemoryIPS[ip].last) {
            delete inMemoryIPS[ip]
        }
    })
}, 10000)

module.exports = {
    authMiddleware: async function ({ req }) {
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
        let found = inMemoryIPS[req.ip]
        if (!found) {
            inMemoryIPS[req.ip] = {
                count: 1,
                last: Date.now()
            }
        } else {
            if (found.last < Date.now() - 5000) found.count = 0
            else if (found.count > 10) throw new Error("Too many requests, wait 5 seconds")
            found.count++
            found.last = Date.now()
        }

        return req
    },
    signToken: function ({ name, email, _id }) {
        const payload = { name, email, _id }
        return jwt.sign({ data: payload }, process.env.SECRET, { expiresIn: expiration })
    },
}
