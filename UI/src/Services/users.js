import axios from 'axios'
import { getCookieHeader } from '../utils/cookies'




const api = axios.create({baseURL: 'http://localhost:5000'})


const getUsers =  (f, query) => {

	api.get(`/users?${query}`, getCookieHeader())
	.then(f)
	.catch(() => {})
}


// exports [activate]
export default getUsers