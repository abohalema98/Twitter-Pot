const nodemailer = require("nodemailer");
const express = require("express");


const azkarPot = express.Router();



azkarPot.post("/azkarpot", (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'meido2397@gmail.com',
            pass: 'meidomeido12345',
        },
    })
    transporter.sendMail({
            from: 'Azkar pot Support ', // sender address
            to: req.body.email, // list of receivers
            subject: "بسم الله الرحمن الرحيم ", // Subject line
            text: "", // plain text body
            html: `
                  <b> ايات القران </b>
                  `, // html body
        })
        .then(() => {
            res.send("success")
        })
        .catch((err) => {
            response.status(500).send(err)
        })

});


module.exports = azkarPot;