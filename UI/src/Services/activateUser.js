import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:5000'})

const sendActivationKey =  (f, g, userId, activationKey) => {
    var r = api.get('/activate/'+userId+'/'+activationKey ).then(f
        ).catch(g)
    return r
}

// exports [activate]
export default sendActivationKey