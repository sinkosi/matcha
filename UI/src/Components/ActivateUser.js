import React, {useState} from 'react'
import sendActivationKey from '../Services/activateUser'
import { Button } from '@material-ui/core'

const ActivateUser = (props) => {
    const [message, setMessage] = useState("Activating...")
    const [disableButton, setDisableButton] = useState(true)
    const verifyActivationKey = () => {
        console.log("doing some verification...")
        let data = props.location.pathname.split("/")
        let userId = data[2];
        let activationKey = data[3]
        console.log({userId},{activationKey})

        sendActivationKey(handleActivated, handleError, userId, activationKey)
    }
    const handleActivated = () => { setMessage("activation successful. Continue to login."); setDisableButton(false) }
    const handleError = (err) => { console.log({err}); setMessage("Error: "+err)}
    verifyActivationKey()
    return (
        <>
            <h1>{message}</h1>
            <Button color="primary" variant="contained" href="/signin" disabled={disableButton}>Continue to login page</Button>
        </>
    )
}

export default ActivateUser