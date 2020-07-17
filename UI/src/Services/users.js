import axios from 'axios'
import { getCookie } from '../utils/cookies'

const api = axios.create({baseURL: 'http://localhost:5000'})
let header = {'headers' : {'token' : `bearer ${getCookie('token')}`}}

const getUsers =  (f) => {
    var r = api.get('/users', header).then(f
        ).catch(err => {
            console.log({err})
            r = err
        })
    return r
}

// exports [activate]
export default getUsers