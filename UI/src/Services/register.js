import Axios from 'axios'
import { backend_url } from '../utils/host'

const register = (data, success, error)=>{

        Axios.post(backend_url + '/signup', data)
        .then(success)
        .catch(error)

}

export default register