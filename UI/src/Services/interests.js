import axios from 'axios'
import { getCookieHeader } from '../utils/cookies'
import { backend_url } from '../utils/host'

const api = axios.create({baseURL: backend_url})
//const api = axios.create({baseURL: 'http://localhost:5000'})

const getAllInterests =  (f, g) => {
	api.get('/interests' )
	.then(f)
	.catch(g)
}




const getUsers =  (f, query) => {

	api.get(`/users/interests?${query}`, getCookieHeader())
	.then(f)
	.catch(() => {})
}

export {getAllInterests, getUsers}