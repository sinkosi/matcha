import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../Styles/formStyle'
import Copyright from '../Copyright';
import Email from './ForgotPassword/Email';
import OTP from './ForgotPassword/OTP';
import NewPassword from './ForgotPassword/NewPassword'

export default function ForgotPassword(props) {
    const [formPage, setFormPage] = useState(0);
    const classes = useStyles();
    const browserHistory = useHistory()
    if (props.loggedIn)
    browserHistory.push('/')
    const handleNext = () => { setFormPage(formPage + 1);}

    return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

           {
              formPage === 0 ? <Email next={handleNext} />
            : formPage === 1 ? <OTP next={handleNext} />
            : formPage === 2 ? <NewPassword />
            : <Fragment></Fragment>
        }

          <Copyright />
        </div>
      </Grid>
    </Grid>
  );
}