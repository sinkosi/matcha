import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../Styles/formStyle';

export default function OTP(){
    const classes = useStyles();
    return (
        <form method="POST" className={classes.form} noValidate>
            
            <Typography component="h1" variant="h5">
                Email
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
              autoFocus
            />
            <Button
              type="submit"
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