import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { updateGender } from '../../../Services/profile'
// import { cookieUserId } from '../../../utils/cookies'
import { UserContext } from '../../UserContext'




const useStyles = makeStyles({
		root: {
			marginTop: '3rem',
			padding: '2rem'
			
		},
	});

export default function Gender(props)
{
		const classes = useStyles();
		const [gender, setGender] = React.useState('bisexual');
		const { userData } = useContext(UserContext);

		const handleChange = (event) => {
			setGender(event.target.value);
		};

		const handleSubmitGender = ()=>{
			// const userId = cookieUserId()
			const userId = userData.data.id
			updateGender(handleSuccess, handleError, userId, gender)
		}
		const handleSuccess = (respose) =>{
			props.next()
		}
		const handleError = (error) => {
		}
		return (
				<Paper elevation={5} className={classes.root}>
						<Typography variant={"h1"} align={"center"}>Gender</Typography> 
						<Typography variant={"h5"} align={"center"}>
								I am a:
						</Typography> 
						<form method="POST" className={classes.form} noValidate>
						
						<RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleChange} >
								<FormControlLabel value="bisexual" control={<Radio />} label="Bisexual" disabled />
								<FormControlLabel value="female" control={<Radio />} label="Female" />
								<FormControlLabel value="male" control={<Radio />} label="Male" />
						</RadioGroup>
								
				
						</form>
						<Button color={"primary"} size={"large"} variant={"contained"} onClick={handleSubmitGender}>Next ></Button>
				</Paper  >
		);
}