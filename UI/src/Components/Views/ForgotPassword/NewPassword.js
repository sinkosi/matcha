import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../Styles/formStyle';

export default function NewPassord(){
  const classes = useStyles();
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
        type="Password2"
        autoComplete="password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        SignUp
      </Button>
      
      
          <Link href="/signin" variant="body2">
            {"Back to sign in page"}
          </Link>
      
    </form>

    );
}