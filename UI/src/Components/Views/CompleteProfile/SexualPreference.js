import React from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';



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
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,

      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    
    return (
        <Paper elevation={5} className={classes.root}>
            <Typography variant={"h1"} align={"center"}>Preferences</Typography> 
            <Typography variant={"h5"} align={"center"}>
                I would like to meet and hookup with:
            </Typography> 
            <form method="POST" className={classes.form} noValidate>
            
                <FormControlLabel
                    className={classes.checkboxFormControl}
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                    label="Females"
                />
                
                <FormControlLabel 
                    className={classes.checkboxFormControl}
                    control={
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="secondary"
                    />
                    }
                    label="Male"
                />
                
        
            </form>
            <Button color={"primary"} size={"large"} variant={"contained"} onClick={props.next}>Next ></Button>
        </Paper  >
    );
}