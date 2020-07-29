import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'; 
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';





const useStyles = makeStyles({
    root: {
        marginTop: '3rem',
        padding: '2rem'
        
      },
    checkboxFormControl: {
    display: 'block'
    
    },
  });


const Congratulations = (props) => {

    const classes = useStyles()
    const history = useHistory()

    const redirectToHome = () => history.push('/')

    return (
        <Paper elevation={5} className={classes.root}>
            <Typography variant={"h1"} align={"center"}>Congratulations</Typography> 
            <Typography variant={"h5"} align={"center"}>
                You have completed all the important information. Click next to start meeting some of the most interesting people.
            </Typography>

            <Button color={"primary"} size={"large"} variant={"contained"} onClick={redirectToHome}  >Next</Button>
        </Paper  >
    );
}

export default Congratulations