import axios from 'axios'
import { getCookie } from '../utils/cookies'

const api = axios.create({baseURL: 'http://localhost:5000'})

const getAllInterests =  (f, g) => {
	api.get('/interests' )
	.then(f)
	.catch(g)
}

let loginData = getCookie('loginData');
let loggedInUserId = -1;
if (loginData) {
	loginData = JSON.parse(loginData);
	loggedInUserId = loginData.data.id; 
}
let header = {'headers' : {loggedInUserId}}



const getUsers =  (f, query) => {

	api.get(`/users/interests?${query}`, header)
	.then(f)
	.catch(() => {})
}

export {getAllInterests, getUsers}