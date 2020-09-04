import axios from 'axios'
import { getCookie } from '../utils/cookies'

let loginData = getCookie('loginData');
let loggedInUserId = -1;
if (loginData) {
	loginData = JSON.parse(loginData);
	loggedInUserId = loginData.data.id; 
}
let header = {'headers' : {loggedInUserId}}

// let header = {'headers' : {'token' : `bearer ${getCookie('token')}`}}

const api = axios.create({baseURL: 'http://localhost:5000'})

const getUser =  (f, userId) => {
	api.get('/users/'+userId , header)
	.then(f)
	.catch(err => {})
}

const getUserInteractions = (f, userId) => {
	api.get(`users/${userId}/interactions`, header)
	.then(f)
	.catch(err => {})
}

const sendLike = (f, g, userId) => {
	api.post(`/users/${userId}/like`, {}, header)
	.then(f)
	.catch(g)
}

const sendUnlike = (f, g, userId) => {
	api.post(`/users/${userId}/unlike`, {}, header)
	.then(f)
	.catch(g)
}

export {getUserInteractions, sendLike, sendUnlike}
export default getUser