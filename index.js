const express = require('express')
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())


// intialize transporter for sending email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
    }
})


// post to link to get form data and post json result
app.post('/form/submitdata', (req, res) => {
    const { name, email, message } = req.body
    transporter.sendMail({
        from: `${name}, <${email}>`,
        to: process.env.SEND,
        subject: 'portfolio message',
        text: message
    }).then(info => {
        return res.json({
            'accepted': info.accepted,
            'rejected': info.rejected
        })
    }).catch((console.error))
})

app.listen(3001)