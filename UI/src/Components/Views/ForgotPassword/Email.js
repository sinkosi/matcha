import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import useStyles from '../../Styles/formStyle';

export default function Email(props){
  const classes = useStyles();
  const [email, setEmail] = useState("")

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSendEmail = () => {

  }
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
              value={email}
              onChange={handleEmailChange}
              autoFocus
            />
            <Button
              // type="submit"
              onClick={props.next}
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