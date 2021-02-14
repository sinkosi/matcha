import axios from 'axios'
import { backend_url } from '../utils/host'

const api = axios.create({baseURL: backend_url})
//const api = axios.create({baseURL: 'http://localhost:5000'})

const sendActivationKey =  (f, g, userId, activationKey) => {
    var r = api.get('/activate/'+userId+'/'+activationKey ).then(f
        ).catch(g)
    return r
}

// exports [activate]
export default sendActivationKey