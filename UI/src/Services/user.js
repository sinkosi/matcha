import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:5000'})

const getUser =  (f, userId) => {
    var r = api.get('/users/'+userId ).then(f
        ).catch(err => {
            console.log({err})
            r = err
        })
    return r
}

// exports [activate]
export default getUser