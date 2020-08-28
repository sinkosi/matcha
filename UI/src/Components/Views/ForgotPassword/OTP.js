import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../Styles/formStyle';
import { useState } from 'react';
import { sendOTP } from '../../../Services/forgotpassword'

export default function OTP(props){
  const [OTP, setOTP] = useState({value:'', error: true, errmsg:''});

  const validateOTP = (event) => {
    console.log()
    var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(event.target.value) === false) 
    {
      setOTP({'value': event.target.value, error: true, errormsg: "OPT contains only letters and numbers. Check your email"});
    } else {
      setOTP({'value': event.target.value, error: false, errormsg: ""})
    }
  }

  const send = () => {
    let data = props.data;
    data.otp = OTP.value;
    props.setData(data);
    console.log(data);
    sendOTP(handleSuccess, handleError, data)
  }

  const handleSuccess = (response) => {
    console.log({response})
    
    props.next();
  }
  const handleError = (error) => {console.log({error})} 

  const classes = useStyles();
  return (
      <form method="POST" className={classes.form} noValidate>
          
          <Typography component="h1" variant="h5">
              OTP
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="otp"
            label="Enter OTP"
            name="otp"
            autoComplete="otp"
            value={OTP.value}
            error={OTP.err}
            helperText={OTP.errmsg}
            onChange={validateOTP}
            autoFocus
          />
          <Button
            // type="submit"
            onClick={send}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Verify
          </Button>
          
          
              <Link href="/signin" variant="body2">
                {"Back to sign in page"}
              </Link>
          
        </form>
  );
}