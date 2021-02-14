import axios from 'axios'
import { backend_url } from '../utils/host'

//const api = axios.create({baseURL: 'http://localhost:5000'})
//const api = axios.create({baseURL: 'http://192.168.8.102:5000'})
const api = axios.create({baseURL: backend_url})

const postLogin =  (success, error, data) => {
    api.post('/login', data)
    .then(success)
    .catch(error)
}

export default postLogin