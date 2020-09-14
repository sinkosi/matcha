import axios from 'axios'
import { backend_url } from '../utils/host'

const api = axios.create({baseURL: backend_url})
//const api = axios.create({baseURL: 'http://localhost:5000'})

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

const sendNewPassword = (f, g, {email, otp, newPassword}) => {
    api.post('forgotpassword/newpassword', {email, otp, newPassword})
    .then(f)
    .catch(g)
}
// exports [activate]
export {sendEmail, sendOTP, sendNewPassword}