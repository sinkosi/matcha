import React, {useState, useEffect} from 'react'
import sendActivationKey from '../Services/activateUser'
import { Button } from '@material-ui/core'

const ActivateUser = (props) => {
	const [message, setMessage] = useState("Activating...")
	const [disableButton, setDisableButton] = useState(true)
	
	const userId = props.location.pathname.split("/")[2]
	const activationKey = props.location.pathname.split("/")[3]
	

	const handleActivated = () => { setMessage("activation successful. Continue to login."); setDisableButton(false) }
	const handleError = (err) => {  setMessage("Error: "+err)}
	useEffect(() => {
		sendActivationKey(handleActivated, handleError, userId, activationKey)},
		 [userId, activationKey])

	
	return (
		<>
			<h1>{message}</h1>
			<Button color="primary" variant="contained" href="/signin" disabled={disableButton}>Continue to login page</Button>
		</>
	)
}

export default ActivateUser