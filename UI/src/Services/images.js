import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:5000'})

const getUserImages =  (userId, f, g) => {
	api.get('/users/'+userId+'/images' )
	.then(f)
	.catch(g)
}

const deleteImage = (imageId, f, g) => {
	api.delete('/images/'+imageId)
	.then(f)
	.catch(g)
}
// exports [activate]
export {getUserImages, deleteImage}