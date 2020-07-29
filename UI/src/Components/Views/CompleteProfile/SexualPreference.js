import React from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { cookieUserId } from '../../../utils/cookies'
import { updatePreference } from '../../../Services/profile'


const useStyles = makeStyles({
    root: {
        marginTop: '3rem',
        padding: '2rem'
        
      },
    checkboxFormControl: {
    display: 'block'
    
    },
  });

export default function SexualPreference(props)
{
    const classes = useStyles();
    const [preference, setPreference] = React.useState('both');

    const handleChange = (event) => {
      console.log(preference)
      setPreference(event.target.value);
    };

    const handleSubmitPreference = ()=>{
      const userId = cookieUserId()
      updatePreference(handleSuccess, handleError, userId, preference)
    }
    const handleSuccess = (respose) =>{
      console.log(respose)
      props.next()
    }
    const handleError = (error) => {
      console.log(error)
    }
    return (
        <Paper elevation={5} className={classes.root}>
            <Typography variant={"h1"} align={"center"}>Preferences</Typography> 
            <Typography variant={"h5"} align={"center"}>
                I would like to meet and connect with:
            </Typography> 
            <form method="POST" className={classes.form} noValidate>
            
            <RadioGroup aria-label="preference" name="preference" value={preference} onChange={handleChange} >
                <FormControlLabel value="both" control={<Radio />} label="Males and females" />
                <FormControlLabel value="males" control={<Radio />} label="Males only" />
                <FormControlLabel value="females" control={<Radio />} label="Females only" />
            </RadioGroup>
                
        
            </form>
            <Button color={"primary"} size={"large"} variant={"contained"} onClick={handleSubmitPreference}>Next ></Button>
        </Paper  >
    );
}