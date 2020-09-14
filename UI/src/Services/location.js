import axios from 'axios'
import { getCookieHeader } from '../utils/cookies'






const api = axios.create({baseURL: 'http://localhost:5000'})
const geoipfy = axios.create({baseURL: 'https://ip-geolocation.whoisxmlapi.com/api/'})


const getLocationData = (f) => {
	
	geoipfy.get("/v1?apiKey=at_5ryScDWbLJH30kMU978Wwcuo6yFLD")
	.then((resp)=> {
		console.log(resp.data)
		api.post("/location",resp.data, getCookieHeader())
		.then((res) => console.log("location sent to server..."))
		.catch(() => console.log("error saving your current location"))
	})
	.catch((err) => {
		console.log(err)
	})
}


// exports [activate]
export default getLocationData