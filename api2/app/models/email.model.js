//const config = require('../../secret.js');
const mailer = require('nodemailer');

// const email = mailer.createTransport({
//     //service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//         user: 'mmamalek@student.wethinkcode.co.za',
//         pass: 'averysimplepasswordcreatedformatcha'
//     }
//     // auth: {
//     //     user: 'sibonelo.dev@gmail.com',
//     //     pass: config.emailPassword
//     // }
// });

// const mailOptions = {
//     from: 'sibonelo.dev@gmail.com',
//     to: 'sibonelo@mailinator.com',
//     subject: 'Testing Nodejs Nodemailer',
//     text: 'Did it actually work Mr. Nkosi?'
// };

// email.sendMail(mailOptions, (err, res) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('Email sent: ' + res.response);
//     }
// })

const Email = function(){
    this.email = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'mmamalek@student.wethinkcode.co.za',
            pass: 'averysimplepasswordcreatedformatcha'
        }
        /*auth: {
               user: config.emailUsername,
               pass: config.emailPassword
        }*/
    });

    this.send = (to, from, subject, message) => {
        //const to = 'sibonelo@mailinator.com';
        const mailOptions = {
            from,
            to,
            subject,
            text: message
        };

        this.email.sendMail(mailOptions, (err, res) => {
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + res.response);
            }
        })
    }

    this.activationEmail = (emailAddress, userId, activationCode) => { 
        msg = `
        Welcome to matcha. Please click the link below to activate your account:
        
        http://localhost:3000/activate/${userId}/${activationCode}`



        this.send(emailAddress, config.emailUsername, "Matcha account activation", msg)
    } 
}

const email = new Email();

module.exports = new Email();