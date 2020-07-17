import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
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

  const [username, setusername] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  
  if (props.loggedIn)
    browserHistory.push('/')

  const validateUsername = (event) => {
    setusername(event.target.value)
  }
  const validateFirstname = (event) => {
    setfirstname(event.target.value)
  }
  const validateLastname = (event) => {
    setlastname(event.target.value)
  }
  const validateEmail = (event) => {
    setemail(event.target.value)
  }
  const validatePassword = (event) => {
    setpassword(event.target.value)
  }
  const validateConfirmPassword = (event) => {
    setconfirmpassword(event.target.value)
  }

  const send_data = () => {
    const formdata = {username, firstname, lastname, email, password}
    console.log(formdata)
    register(formdata) ? console.log(true) : console.log(false)
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
            Sign Up
          </Typography>

          <form className={classes.form}  noValidate>
          
            <FormControl fullWidth >
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                autoFocus
                onChange={e => validateUsername(e)}
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
                value={firstname}
                onChange={e => validateFirstname(e)}
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
                value={lastname}
                onChange={e => validateLastname(e)}
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
                value={email}
                onChange={e => validateEmail(e)}
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
                value={password}
                onChange={e => validatePassword(e)}
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
                value={confirmpassword}
                onChange={e => validateConfirmPassword(e)}
              />
            </FormControl>
            <Button
              onClick={send_data}
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