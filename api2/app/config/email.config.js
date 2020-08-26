const config = require('../../secret.js');
const mailer = require('nodemailer');

const email = mailer.createTransport({
    //service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'sibonelo.dev@gmail.com',
        pass: config.emailPassword
    }
});

const mailOptions = {
    from: 'sibonelo.dev@gmail.com',
    to: 'sibonelo@mailinator.com',
    subject: 'Testing Nodejs Nodemailer',
    text: 'Did it actually work Mr. Nkosi?'
};

email.sendMail(mailOptions, (err, res) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Email sent: ' + res.response);
    }
})