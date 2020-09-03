import React, {useState, useEffect, useRef, useContext }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import getUser from '../../../Services/user'
import { updateUserProfile } from '../../../Services/profile'
import { Container, Grid, Paper, TextField, Button, RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
	root: {

	},
	image: {
		maxWidth: "100%"
	  },
	paper: {
		width:'100%',
		padding: '1rem',
		height:'100%'
	},
	title: {
		marginBottom:'1rem'
	},
	images: {
		maxWidth:"100%",
		padding: "1rem"
	},
	radio: {
		marginLeft: "1rem",
		marginBottom: "1rem"
	},
	bio: {
		marginBottom: "1rem"
	}
});



const Password = (props) => {


	const classes = useStyles()
	const [password, setpassword] = useState({'value':'', 'error':false, 'errormsg':''})
	const [newPassword, setNewPassword] = useState({'value':'', 'error':false, 'errormsg':''})
	const [confirmpassword, setconfirmpassword] = useState({'value':'', 'error':false, 'errormsg':''})


	
	const validatePassword = (event) => {

		var msg = "Must have 8 to 20 characters, at least 1 letter, 1 number and 1 special character:";
		var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
		if (reg.test(event.target.value) === false) 
		{
		  setpassword({'value': event.target.value, error: true, errormsg: msg})
		} else {
		setpassword({'value': event.target.value, error: false, errormsg: ""})
		}
	}

	const validateNewPassword = (event) => {

		var msg = "Must have 8 to 20 characters, at least 1 letter, 1 number and 1 special character:";
		var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
		if (reg.test(event.target.value) === false) 
		{
		  setNewPassword({'value': event.target.value, error: true, errormsg: msg})
		} else {
			setNewPassword({'value': event.target.value, error: false, errormsg: ""})
		}
	}
	
	const validateConfirmPassword = (event) => {
		var msg = "Must be the same as password entered above"
		if (event.target.value !== password.value){
		  setconfirmpassword({'value': event.target.value, error: true, errormsg: msg})
		} else {
		  setconfirmpassword({'value': event.target.value, error: false, errormsg: ""})
		}
	  }
	  const send_data = () => {
		const formdata = {}
		console.log(formdata)
		updateUserProfile(handleSuccess, handleError, props.user.data.id,formdata)
	  }
	
	  const handleSuccess = (response) => {
		console.log({response})
 
	  }
	
	  const handleError = (error) =>{
		console.log({error})
	  }
	return (
		<>
		<Paper elevation={2} className={classes.paper}>
		<form className={classes.form}  noValidate={false} >
		<FormControl fullWidth>
			<TextField
				variant="outlined"
				margin="normal"
				required
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
				value={password.value}
				onChange={e => validatePassword(e)}
				error = {password.error}
				helperText = {password.errormsg}
			/>
		</FormControl>

		<FormControl fullWidth>
			<TextField
				variant="outlined"
				margin="normal"
				required
				name="newPassword"
				label="New Password"
				type="password"
				id="newPassword"
				autoComplete="new-password"
				value={newPassword.value}
				onChange={e => validateNewPassword(e)}
				error = {newPassword.error}
				helperText = {newPassword.errormsg}
			/>
		</FormControl>

		<FormControl fullWidth>
			<TextField
				variant="outlined"
				margin="normal"
				required
				name="confirmpassword"
				label="Confirm Password"
				type="password"
				id="confirmpassword"
				autoComplete="confirm-password"
				value={confirmpassword.value}
				onChange={e => validateConfirmPassword(e)}
				error = {confirmpassword.error}
				helperText = {confirmpassword.errormsg}
			/>
		</FormControl>





		  <Button
			  onClick={send_data}
			//   type='submit'
			  fullWidth
			  variant="contained"
			  color="primary"
			>
			  Update Password
			</Button>
			</form>
		</Paper>
		</>
	)
}

export default Password