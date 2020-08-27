import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../Styles/formStyle';
import { sendNewPassword } from '../../../Services/forgotpassword'
import { useHistory } from 'react-router-dom';

export default function NewPassord(props){
  const classes = useStyles();
  const browserHistory = useHistory();
  const [password, setpassword] = useState({'value':'', 'error':false, 'errormsg':''})
  const [confirmpassword, setconfirmpassword] = useState({'value':'', 'error':false, 'errormsg':''})

  const validatePassword = (event) => {

    var msg = "Must have 8 to 20 characters, at least 1 letter, 1 number and 1 special character:";
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
    if (reg.test(event.target.value) === false) 
    {
      setpassword({'value': event.target.value, error: true, errormsg: msg})
    } else {
      setpassword({'value': event.target.value, error: false, errormsg: ""})
    }
  }
  const validateConfirmPassword = (event) => {
    var msg = "Must be the same as password entered above"
    if (event.target.value !== password.value){
      setconfirmpassword({'value': event.target.value, error: true, errormsg: msg})
    } else {
      setconfirmpassword({'value': event.target.value, error: false, errormsg: ""})
    }
  }

  const send = () => {
    let data = props.data;
    data.newPassword = password.value;
    props.setData(data);
    console.log(data);
    sendNewPassword(handleSuccess, handleError, data)
  }

  const handleSuccess = (response) => {
    console.log({response})
    

    browserHistory.push("/")
  }
  const handleError = (error) => {console.log({error})} 




    return (
      <form method="POST" className={classes.form} noValidate>
            
      <Typography component="h1" variant="h5">
          New Password
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        label="New Password"
        name="password"
        type="Password"
        autoComplete="password"
        value={password.value}
        onChange={validatePassword}
        helperText={password.errormsg}
        error={password.error}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password2"
        label="Confirm Password"
        name="password2"
        type="Password"
        autoComplete="password"
        value={confirmpassword.value}
        onChange={validateConfirmPassword}
        helperText={confirmpassword.errormsg}
        error={confirmpassword.error}
      />
      <Button
        onClick={send}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Save Password
      </Button>
      
      
          <Link href="/signin" variant="body2">
            {"Back to sign in page"}
          </Link>
      
    </form>

    );
}