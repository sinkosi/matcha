import React, {useState} from 'react'
import { Button } from '@material-ui/core'

const AccountNotActivated = (props) => {
    const [message, setMessage] = useState("Would you like to resend activation code?")
	const [disableButton, setDisableButton] = useState(false)

    return (
        <>
            <h1>Account not activated</h1>
            <h2>Please check your email for instructions on how to activate your account.</h2>

            <h1>{message}</h1>
			<Button color="primary" variant="contained" href="/signin" disabled={disableButton}>Resend Code</Button>
        </>
    )
}
export default AccountNotActivated

/**
 * ! - This is a similar method as ActivateUser.js
*/