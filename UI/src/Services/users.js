import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:5000'})


const getUsers =  (f, token) => {
    let header = {'headers' : {'token' : `bearer ${token}`}}

    var r = api.get('/users', header).then(f
        ).catch(err => {
            console.log({err})
            r = err
        })
    return r
}

// exports [activate]
export default getUsers