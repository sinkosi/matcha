import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import useStyles from '../../Styles/formStyle';
import {sendEmail} from '../../../Services/forgotpassword';

export default function Email(props){
  const [email, setemail] = useState({'value':'', 'error':false, 'errormsg':''})

  const validateEmail = (event) => {

    // setemail(event.target.value)
    var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(event.target.value) === false) 
    {
      setemail({'value': event.target.value, error: true, errormsg: "Insert valid email"});
    } else {
      setemail({'value': event.target.value, error: false, errormsg: ""})
    }
  }

  const send = () => {
    let data = props.data;
    data.email = email.value;
    props.setData(data);
    sendEmail(handleSuccess, handleError, email.value)
  }

  const handleSuccess = (response) => {
    console.log({response})
    
    props.next();
  }
  const handleError = (error) => {console.log({error})} 

  const classes = useStyles();

    return (
      <React.Fragment>

      <form method="POST" className={classes.form} noValidate>
            
            <Typography component="h1" variant="h5">
                Email
            </Typography>
            <TextField
              variant="outlined" 
              type="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={validateEmail}
              autoFocus
              value={email.value}
              error = {email.error}
              helperText = {email.errormsg}
            />
            <Button
              // type="submit"
              onClick={send}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Next >
            </Button>
            
            
                <Link href="/signin" variant="body2">
                  {"Back to sign in page"}
                </Link>
            
          </form>


        
            
        </React.Fragment>
    );
}