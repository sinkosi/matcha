import Axios from 'axios'

const register = (data, success, error)=>{

        Axios.post('http://localhost:5000/signup', data)
        .then(success)
        .catch(error)

}

export default register