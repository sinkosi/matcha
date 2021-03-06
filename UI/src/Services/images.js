import axios from 'axios'
import { backend_url } from '../utils/host'

const api = axios.create({baseURL: backend_url})
//const api = axios.create({baseURL: 'http://localhost:5000'})

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