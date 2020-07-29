import axios from 'axios'
const api = axios.create({baseURL: 'http://localhost:5000'})

const sendEmail =  (success, error, email) => {
    const data = {'step1': {email}}

    api.post('/resetpassword', data)
    .then(success)
    .catch(error)
}


const reset =  (success, error, email, otp, password) => {
    const data = {'step2': {email, opt, password}}

    api.post('/resetpassword', data)
    .then(success)
    .catch(error)
}

export {sendEmail}
