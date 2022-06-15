const nodemailer = require("nodemailer")
require("dotenv").config()

if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
    console.log("Please set EMAIL and EMAIL_PASS in .env")
    process.exit(1)
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

async function sendMail(to, subject, { html, text }) {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html,
        text
    }

    const result = await transporter.sendMail(mailOptions)

    console.log(JSON.stringify(result, null, 4));

    return result
}

async function sendVerificationEmail(to, verifyCode) {
    const subject = "Verify your email"
    const html = `<p>Please verify your email by entering the code below:</p>

    <p>${verifyCode}</p>`

    return await sendMail(to, subject, { html })
}

module.exports = {
    sendMail,
    sendVerificationEmail
}