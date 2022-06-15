const { signToken } = require('./auth')
const propReducer = require('./propReducer')
const { sendMail, sendVerificationEmail } = require('./sendMail')

module.exports = { signToken, propReducer, sendMail, sendVerificationEmail }