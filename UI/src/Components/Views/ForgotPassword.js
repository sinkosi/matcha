import React, { Fragment } from 'react';
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



// const steps = ['email address', 'one time pin', 'new password'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <Email />;
//     case 1:
//       return <OTP />;
//     case 2:
//       return <NewPassword />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

export default function ForgotPassword() {
    const [formPage, setFormPage] = useState(0);
    const classes = useStyles();
    
    const handleNext = () => { setFormPage(formPage + 1);}
    const handlePrev = () => { setFormPage(formPage - 1);}

    

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
            formPage === 0 ? 
                <Email />
            : formPage === 1 ? <OTP />
            : formPage === 2 ? <NewPassword />
            : <Fragment></Fragment>
        }

          <Copyright />
        </div>
      </Grid>
    </Grid>
  );
}