import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import useStyles from '../../Styles/formStyle';

export default function Email(){
  const classes = useStyles();
    return (
      <React.Fragment>

      <form method="POST" className={classes.form} noValidate>
            
            <Typography component="h1" variant="h5">
                Email
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            
            
                <Link href="#" variant="body2">
                  {"Back to sign in page"}
                </Link>
            
          </form>


        
            
        </React.Fragment>
    );
}