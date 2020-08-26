import Axios from 'axios'

const register = (data)=>{

    //Axios.post('http://localhost:5000/register', data).then(
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

const activate = (code) => {

    Axios.get('http://localhost:5000/users/activation/activate/'+code).then(
        response => {
            console.log({response})
            return true
        }
        ).catch(err => {
            console.log({err})
            return false
        })

}
// exports [activate]
export default register