import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom'; 
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../UserContext';
import getUser from '../../../Services/user';
import { getCookie, setCookieRememberMe } from '../../../utils/cookies';





const useStyles = makeStyles({
    root: {
        marginTop: '3rem',
        padding: '2rem'
        
      },
    checkboxFormControl: {
    display: 'block'
    
    },
  });


const Congratulations = (props) => {
    const {userData, setUserData}  = useCallback(UserContext)
    const classes = useStyles()
    const history = useHistory()
    console.log("before getUser.... userData: ", userData)
    const redirectToHome = () => history.push('/')
    
    
    ////////////////////////
    let loginData = getCookie('loginData');

    let userDataTemp = {}
    
    if (loginData) {
        loginData = JSON.parse(loginData);
        userDataTemp = loginData;

        console.log("userDataTemp before getUser....", userDataTemp)
        getUser((response)=>{
            console.log("getUser was called with id: ", userDataTemp.data.id)
            console.log("inside getUser. response: ", response)
    
            let newUserData = {...userDataTemp, data: response.data, completed:true}
            console.log({newUserData})
            setUserData(newUserData)
            setCookieRememberMe('loginData', JSON.stringify(newUserData))
        },
        userDataTemp.data.id)
    }
    ///////////////////////
    
    
    


    return (
        <Paper elevation={5} className={classes.root}>
            <Typography variant={"h1"} align={"center"}>Congratulations</Typography> 
            <Typography variant={"h5"} align={"center"}>
                You have completed all the important information. Click next to start meeting some of the most interesting people.
            </Typography>

            <Button color={"primary"} size={"large"} variant={"contained"} onClick={redirectToHome}  >Next</Button>
        </Paper  >
    );
}

export default Congratulations