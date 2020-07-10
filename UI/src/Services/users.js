import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:5000'})

const getUsers =  (f) => {
    var r = api.get('/users').then(f
        ).catch(err => {
            console.log({err})
            r = err
        })
    return r
}

// exports [activate]
export default getUsers