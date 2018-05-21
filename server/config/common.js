const config    = require('./config')
// const nodemailer = require('nodemailer');
const fs        = require("fs");
const emailCreate      = require("../../private_modules/email");

const emailTemplate   = fs.readFileSync("server/templates/email.html", 'utf8');
/*
exports.sentMailVerificationLink = (user, token, callback) => {
    var textLink = `${config.server.host}/verify/${token}`
    var result = emailCreate( emailTemplate, textLink);
    var email = {
        from: 'Diantum <no-reply@diantum.com>',
        to: user.email,
        subject: 'Email Verification',
        html: result
    };
    mailgun.messages().send(email, (err, body) => {
        if (err) {
            console.log(`Error en enviar el mensaje: ${err}`);
            callback(err, null);
        } else {
            console.log(`Message sent: ${body}`);
            callback(null, body);

        }
        
    });

};

exports.sentMailForgotPassword = (user, token, callback) => {
    textLink = `${config.server.host}/reset/${token}`;
    var result = emailCreate(emailTemplate, textLink);
    var email = {
        from: 'Diantum <no-reply@diantum.com',
        to: user.email,
        subject: 'Account New password',
        html: result
    }
    mailgun.messages().send(email, (err, body) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            console.log(`Message sent: ${body}`);
            callback(null, body)
        }
    })
}
*/