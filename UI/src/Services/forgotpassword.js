import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:5000'})

const sendEmail =  (f, g, email) => {
    api.post('/forgotpassword/email', {email} )
    .then(f)
    .catch(g)
}

const sendOTP = (f, g, {email, otp}) => {
    api.post('/forgotpassword/otp', {email, otp})
    .then(f)
    .catch(g)
}

const sendNewPassword = (f, g, {email, otp, password}) => {
    api.post('forgotpassword/newpassword', {email, otp, password})
    .then(f)
    .catch(g)
}
// exports [activate]
export {sendEmail, sendOTP, sendNewPassword}