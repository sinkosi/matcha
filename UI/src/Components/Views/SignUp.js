import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from '../Styles/formStyle';
import Copyright from '../Copyright';
import register from '../../Services/register'

export default function SignUp(props) {
  const browserHistory = useHistory()
  const classes = useStyles();

  const [username, setusername] = useState({'value':'', 'error':false, 'errormsg':''})
  const [firstname, setfirstname] = useState({'value':'', 'error':false, 'errormsg':''})
  const [lastname, setlastname] = useState({'value':'', 'error':false, 'errormsg':''})
  const [email, setemail] = useState({'value':'', 'error':false, 'errormsg':''})
  const [password, setpassword] = useState({'value':'', 'error':false, 'errormsg':''})
  const [confirmpassword, setconfirmpassword] = useState({'value':'', 'error':false, 'errormsg':''})
  
  if (props.loggedIn)
    browserHistory.push('/')

  const validateUsername = (event) => {
    var msg = "username can only have numeric values, alphabets, hyphens or apostrophy"
    var reg = /^[A-Za-z0-9'-]+$/
    if(reg.test(event.target.value) === false) {
      setusername({'value': event.target.value, error: true, errormsg: msg})
    } else {
      setusername({'value': event.target.value, error: false, errormsg: ""})
    }
  }
  const validateFirstname = (event) => {

    var msg = "First name can only have alphabets, hyphens or apostrophies"
    var reg = /^[a-zA-Z']?[- a-zA-Z']+$/
    if(reg.test(event.target.value) === false) {
      setfirstname({'value': event.target.value, error: true, errormsg: msg})
    } else {
      setfirstname({'value': event.target.value, error: false, errormsg: ""})
    }
  }
  const validateLastname = (event) => {
    // setlastname(event.target.value)

    var msg = "Last Name can only have characters, hyphens or apostrophy"
    var reg = /^[a-zA-Z']?[- a-zA-Z']+$/
    if(reg.test(event.target.value) === false) {
      setlastname({'value': event.target.value, error: true, errormsg: msg})
    } else {
      setlastname({'value': event.target.value, error: false, errormsg: ""})
    }
  }
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

  const send_data = () => {
    const formdata = {'username':username.value, 'firstname':firstname.value, 'lastname':lastname.value, 'email':email.value, 'password':password.value}

    register(formdata, handleSuccess, handleError)
  }

  const handleSuccess = (response) => {
    browserHistory.push('/registrationsuccessful')
  }

  const handleError = () =>{ return }



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <form className={classes.form}  noValidate={false} >
          
            <FormControl fullWidth >
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username.value}
                autoFocus
                onChange={e => validateUsername(e)}
                error = {username.error}
                helperText = {username.errormsg}

              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                value={firstname.value}
                onChange={e => validateFirstname(e)}
                error = {firstname.error}
                helperText = {firstname.errormsg}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                value={lastname.value}
                onChange={e => validateLastname(e)}
                error = {lastname.error}
                helperText = {lastname.errormsg}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email.value}
                onChange={e => validateEmail(e)}
                error = {email.error}
                helperText = {email.errormsg}

              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password.value}
                onChange={e => validatePassword(e)}
                error = {password.error}
                helperText = {password.errormsg}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
                required
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="confirm-password"
                value={confirmpassword.value}
                onChange={e => validateConfirmPassword(e)}
                error = {confirmpassword.error}
                helperText = {confirmpassword.errormsg}
              />
            </FormControl>
            <Button
              onClick={send_data}
              // type='submit'
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              SignUp
            </Button>
            <Grid container>
              <Grid item xs>
                <></>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}