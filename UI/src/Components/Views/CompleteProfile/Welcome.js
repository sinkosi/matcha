import React from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
      marginTop: '3rem',
      padding: '2rem'
      
    },
  });

export default function Welcome(props)
{
    const classes = useStyles();
    return (
        <Paper elevation={5} className={classes.root}>
            <Typography variant={"h1"} align={"center"}>Welcome</Typography> 
            <Typography variant={"h5"} align={"center"}>
                Thank you for joining Matcha.
                Before you can start meeting some people, and possibly meeting the love of your life, we need a few delails about you.
                Please click next to continue... Enjoy. 
            </Typography> 
            <Button color={"primary"} size={"large"} variant={"contained"}  onClick={props.next} >Next &gt</Button>
        </Paper  >
    );
}