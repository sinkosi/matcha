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
  const [usernameEmail, setUsernameEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  if (userData.loggedIn)
    history.push('/')
    
  const handleRememberMe = ({target}) => setRememberMe(target.checked)
  
  const validateUsernameEmail = ({target}) => {
    setUsernameEmail(target.value)
  }

  const validatePassword = ({target}) => {
    setPassword(target.value)
  }

  const sendData = () => {
    let data = { 'login': usernameEmail, password }

    postLogin(handleLoginSuccess, handleLoginError,data)
  }

  const handleLoginError = (error) => { console.log({error}) }

  const handleLoginSuccess = (response) => {

    console.log(response)

    if (!response.data.activated){
      history.push("/accountnotactivated")
      return false;
    }
    if (rememberMe)
      setCookieRememberMe('token', response.data.token, 2)
    else
      setCookie('token', response.data.token)
    
    setUserData({'loggedIn': true, 'token': response.data.token, 'completed': response.data.completed })
    
    console.log(response.data.completed)
    response.data.completed ? history.push("/") : history.push("/completeprofile") 
  }

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
              value={usernameEmail}
              onChange={validateUsernameEmail}
              autoFocus
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
              value={password}
              onChange={validatePassword}
              autoComplete="current-password"
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