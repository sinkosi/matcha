import axios from 'axios'
import { getCookieHeader } from '../utils/cookies'
import { backend_url } from '../utils/host'

const api = axios.create({baseURL: backend_url})
// let header = {'headers' : {'token' : `bearer ${getCookie('token')}`}}

//const api = axios.create({baseURL: 'http://localhost:5000'})

const updateGender =  (success, error, userId, gender) => {
	const data = {'gender': gender}


	api.put('/users/'+userId, data, getCookieHeader())
	.then(success)
	.catch(error)
}

const updatePreference =  (success, error, userId, preference) => {
	const data = {'sexualPreference': preference}

	api.put('/users/'+userId, data, getCookieHeader())
	.then(success)
	.catch(error)
}

const updateInterests =  (success, error, userId, interests) => {
	const data = {'interests': interests}

	api.put('/users/'+userId, data, getCookieHeader())
	.then(success)
	.catch(error)
}

const updateProfilePic =  (success, error, userId, imageId) => {
	const data = {'profilePic': imageId}

	api.put('/users/'+userId, data, getCookieHeader())
	.then(success)
	.catch(error)
}

const updateBiography =  (success, error, userId, biography) => {
	const data = {'biography': biography}

	api.put('/users/'+userId, data, getCookieHeader())
	.then(success)
	.catch(error)
}

const updateUserProfile =  (success, error, userId, data) => {

	api.put('/users/'+userId, data, getCookieHeader())
	.then(success)
	.catch(error)
}

const uploadImage =  (success, error, userId, image) => {

	api.post('/images/upload/'+userId, image, getCookieHeader())
	.then(success)
	.catch(error)
}

export {updateGender, updatePreference, updateInterests, updateProfilePic, updateBiography, uploadImage, updateUserProfile}
