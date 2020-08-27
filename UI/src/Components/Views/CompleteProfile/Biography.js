import React from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import {updateBiography} from '../../../Services/profile'
import { cookieUserId } from '../../../utils/cookies'




const useStyles = makeStyles({
    root: {
        marginTop: '3rem',
        padding: '2rem'
        
      },
    checkboxFormControl: {
    display: 'block'
    
    },
  });

export default function Biography(props)
{
    const classes = useStyles();
    var [biography, setBiography] = React.useState("");
    
    


    const handleBiographyChange = (event) => setBiography(event.target.value);

    const handleSubmitBiography = () => {
        const userId = cookieUserId()
        updateBiography(handleSuccess, handleError, userId, biography)
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
            <Typography variant={"h1"} align={"center"}>biography</Typography> 
            <Typography variant={"h5"} align={"center"}>
                A short interesting bio about yourself
            </Typography> 

            <form method="POST" className={classes.form} noValidate>
            
                <TextField
                    variant="outlined"
                    // margin="normal"
                    value={biography}
                    fullWidth
                    id="biography"
                    label="biography"
                    name="biography"
                    onChange={handleBiographyChange}
                    autoFocus
                    />
            </form>
      
         
            <Button color={"primary"} size={"large"} variant={"contained"} onClick={handleSubmitBiography}>Next ></Button>
        </Paper  >
    );
}