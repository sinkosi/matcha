import axios from 'axios'
import { getCookieHeader } from '../utils/cookies'

const api = axios.create({baseURL: 'http://localhost:5000'})

const getAllInterests =  (f, g) => {
	api.get('/interests' )
	.then(f)
	.catch(g)
}




const getMatches =  (f) => {

	api.get(`/matches`, getCookieHeader())
	.then(f)
	.catch((err) => {console.log(err)})
}

export {getAllInterests, getMatches}