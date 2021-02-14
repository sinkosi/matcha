import axios from 'axios'
import { getCookieHeader } from '../utils/cookies'
import { backend_url } from '../utils/host'

const api = axios.create({baseURL: backend_url})
// let header = {'headers' : {'token' : `bearer ${getCookie('token')}`}}

//const api = axios.create({baseURL: 'http://localhost:5000'})

const getUser =  (f, userId) => {
	api.get('/users/'+userId , getCookieHeader())
	.then(f)
	.catch(err => {})
}

const getUserInteractions = (f, userId) => {
	api.get(`users/${userId}/interactions`, getCookieHeader())
	.then(f)
	.catch(err => {})
}

const sendLike = (f, g, userId) => {
	api.post(`/users/${userId}/like`, {}, getCookieHeader())
	.then(f)
	.catch(g)
}

const sendUnlike = (f, g, userId) => {
	api.post(`/users/${userId}/unlike`, {}, getCookieHeader())
	.then(f)
	.catch(g)
}

const sendBlock = (f, g, userId) => {
	let sendBlockApiRoute = `/users/${userId}/block`//the route to send a block request
	api.post(sendBlockApiRoute, {}, getCookieHeader())
	.then(f)
	.catch(g)
}

const sendUnblock = (f, g, userId) => {
	let sendUnblockApiRoute = `/users/${userId}/unblock` //the api route to send a unblock request
	api.post(sendUnblockApiRoute, {}, getCookieHeader())
	.then(f)
	.catch(g)
}
export {getUserInteractions, sendLike, sendUnlike, sendBlock, sendUnblock, getUser}
export default getUser