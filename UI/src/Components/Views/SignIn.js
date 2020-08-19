import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from '../Styles/formStyle';
import Copyright from '../Copyright';
import postLogin from '../../Services/login'
import {setCookie, setCookieRememberMe} from '../../utils/cookies'

export default function SignIn(props) {
  const {userData, setUserData} = useContext(UserContext)
  const classes = useStyles()
  const history = useHistory()
  const [usernameEmail, setUsernameEmail] = useState({'value': "", error: false, errormsg: ""})
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleRememberMe = ({target}) => setRememberMe(target.checked)
  
  const validateUsernameEmail = ({target}) => {

    var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(target.value) === false) 
    {
      setUsernameEmail({'value': target.value, error: true, errormsg: "Insert valid email"});
    } else {
      setUsernameEmail({'value': target.value, error: false, errormsg: ""})
    }
  }

  const validatePassword = ({target}) => {

    var msg = "Must have 8 to 20 characters, at least 1 letter, 1 number and 1 special character:";
    var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (reg.test(target.value) === false) 
    {
      setPassword({'value': target.value, error: true, errormsg: msg})
    } else {
    setPassword({'value': target.value, error: false, errormsg: ""})
    }
  }

  const sendData = () => {
    let data = { 'login': usernameEmail, password }

    postLogin(handleLoginSuccess, handleLoginError,data)
  }

  const handleLoginError = (error) => { console.log({error}) }

  const handleLoginSuccess = ({data}) => {

    if (rememberMe)
      setCookieRememberMe('token', data.token, 2)
    else
      setCookie('token', data.token)
    
    setUserData({'loggedIn': true, 'token': data.token })
    
    data.completed ? history.push("/completeprofile") : history.push("/users") }

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
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="usernameEmail"
              label="Username or Email Address"
              name="usernameEmail"
              autoComplete="username"
              value={usernameEmail.value}
              onChange={validateUsernameEmail}
              autoFocus
              error = {usernameEmail.error}
              helperText = {usernameEmail.errormsg}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password.value}
              onChange={validatePassword}
              autoComplete="current-password"
              error = {password.error}
              helperText = {password.errormsg}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={handleRememberMe}/>}
              label="Remember me"
            />
            <Button
              onClick={sendData}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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