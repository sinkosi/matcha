import Axios from 'axios'

const register = (data)=>{

        Axios.post('http://localhost:5000/signup', data).then(
        response => {
            console.log({response})
            return true
        }
        ).catch(err => {
            console.log({err})
            return false
        })

}

export default register