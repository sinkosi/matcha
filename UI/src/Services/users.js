import axios from 'axios'
import { getCookie } from '../utils/cookies'

let loginData = getCookie('loginData');
let loggedInUserId = -1;
if (loginData) {
	loginData = JSON.parse(loginData);
	loggedInUserId = loginData.data.id; 
}
let header = {'headers' : {loggedInUserId}}


const api = axios.create({baseURL: 'http://localhost:5000'})


const getUsers =  (f, query) => {

	api.get(`/users?${query}`, header)
	.then(f)
	.catch(() => {})
}


// exports [activate]
export default getUsers