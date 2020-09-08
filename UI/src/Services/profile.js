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

const updateGender =  (success, error, userId, gender) => {
	const data = {'gender': gender}


	api.put('/users/'+userId, data, header)
	.then(success)
	.catch(error)
}

const updatePreference =  (success, error, userId, preference) => {
	const data = {'sexual_preference': preference}

	api.put('/users/'+userId, data, header)
	.then(success)
	.catch(error)
}

const updateInterests =  (success, error, userId, interests) => {
	const data = {'interests': interests}

	api.put('/users/'+userId, data, header)
	.then(success)
	.catch(error)
}

const updateProfilePic =  (success, error, userId, imageId) => {
	const data = {'profile_pic': imageId}

	api.put('/users/'+userId, data, header)
	.then(success)
	.catch(error)
}

const updateBiography =  (success, error, userId, biography) => {
	const data = {'biography': biography}

	api.put('/users/'+userId, data, header)
	.then(success)
	.catch(error)
}

const updateUserProfile =  (success, error, userId, data) => {

	api.put('/users/'+userId, data, header)
	.then(success)
	.catch(error)
}

const uploadImage =  (success, error, userId, image) => {

	api.post('/images/upload/'+userId, image, header)
	.then(success)
	.catch(error)
}

export {updateGender, updatePreference, updateInterests, updateProfilePic, updateBiography, uploadImage, updateUserProfile}
