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
const geoipfy = axios.create({baseURL: 'https://ip-geolocation.whoisxmlapi.com/api/'})


const getLocationData = (f) => {
	let loginData = getCookie('loginData');
	let loggedInUserId = -1;
	if (loginData) {
		loginData = JSON.parse(loginData);
		loggedInUserId = loginData.data.id; 
	}
	let header = {'headers' : {loggedInUserId}}
	geoipfy.get("/v1?apiKey=at_5ryScDWbLJH30kMU978Wwcuo6yFLD")
	.then((resp)=> {
		console.log(resp.data)
		api.post("/location",resp.data, header)
		.then((res) => console.log("location sent to server..."))
		.catch(() => console.log("error saving your current location"))
	})
	.catch((err) => {
		console.log(err)
	})
}


// exports [activate]
export default getLocationData