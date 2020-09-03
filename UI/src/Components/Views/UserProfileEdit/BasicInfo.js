import React, {useState }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { updateUserProfile } from '../../../Services/profile'
import { Paper, TextField, Button, RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core'
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



const BasicInfo = (props) => {
    const [username, setusername] = useState({'value':props.user.data.username, 'error':false, 'errormsg':''})
    const [firstname, setfirstname] = useState({'value':props.user.data.firstname, 'error':false, 'errormsg':''})
    const [lastname, setlastname] = useState({'value':props.user.data.lastname, 'error':false, 'errormsg':''})
    const [email, setemail] = useState({'value':props.user.data.email, 'error':false, 'errormsg':''})
    const [gender, setGender] = React.useState(props.user.data.gender)
    const [preference, setPreference] = React.useState(props.user.data.sexual_preferences)
    var [biography, setBiography] = React.useState(props.user.data.biography)


    const classes = useStyles()
    
    console.log(props.user)

    const validateUsername = (event) => {
        var msg = "username can only have numeric values, alphabets, hyphens or apostrophy"
        var reg = /^[A-Za-z0-9'-]+$/
        if(reg.test(event.target.value) === false) {
          setusername({'value': event.target.value, error: true, errormsg: msg})
        } else {
          setusername({'value': event.target.value, error: false, errormsg: ""})
        }
      }
      const validateFirstname = (event) => {
    
        var msg = "First name can only have alphabets, hyphens or apostrophies"
        var reg = /^[a-zA-Z']?[- a-zA-Z']+$/
        if(reg.test(event.target.value) === false) {
          setfirstname({'value': event.target.value, error: true, errormsg: msg})
        } else {
          setfirstname({'value': event.target.value, error: false, errormsg: ""})
        }
      }
      const validateLastname = (event) => {
        // setlastname(event.target.value)
    
        var msg = "Last Name can only have characters, hyphens or apostrophy"
        var reg = /^[a-zA-Z']?[- a-zA-Z']+$/
        if(reg.test(event.target.value) === false) {
          setlastname({'value': event.target.value, error: true, errormsg: msg})
        } else {
          setlastname({'value': event.target.value, error: false, errormsg: ""})
        }
      }
      const validateEmail = (event) => {
    
        // setemail(event.target.value)
        var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(event.target.value) === false) 
        {
          setemail({'value': event.target.value, error: true, errormsg: "Insert valid email"});
        } else {
          setemail({'value': event.target.value, error: false, errormsg: ""})
        }
      }

      const validateGender = (event) => {
        console.log(gender)
        setGender(event.target.value);
      }

      const validateSexualPreference = (event) => {
        console.log(preference)
        setPreference(event.target.value);
      };
      
      const validateBiography = (event) => setBiography(event.target.value);

    
      const send_data = () => {
        const formdata = {'username':username.value, 'firstname':firstname.value, 'lastname':lastname.value, 'email':email.value, gender, sexualPreference:preference, biography}
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
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username.value}
                // autoFocus
                fullWidth
                onChange={e => validateUsername(e)}
                error = {username.error}
                helperText = {username.errormsg}
                disabled
            />
         
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              value={firstname.value}
              onChange={e => validateFirstname(e)}
              error = {firstname.error}
              fullWidth
              helperText = {firstname.errormsg}
            />
        
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              value={lastname.value}
              fullWidth
              onChange={e => validateLastname(e)}
              error = {lastname.error}
              helperText = {lastname.errormsg}
            />
    
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email.value}
              onChange={e => validateEmail(e)}
              error = {email.error}
              helperText = {email.errormsg}
              fullWidth

            />
            <FormControl label="Gender" variant="outlined" fullWidth required>
                <label htmlFor="gender"> <Typography variant="h6">Gender</Typography></label>
                <RadioGroup id="gender" aria-label="gender" name="gender" value={gender} onChange={validateGender} className={classes.radio}>
                    <FormControlLabel value="bisexual" control={<Radio />} label="Bisexual" disabled />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>

            <FormControl label="Sexual preference" variant="outlined" fullWidth required>
                <label htmlFor="preference"> <Typography variant="h6">Sexual Preference</Typography></label>
                <RadioGroup id="preference" aria-label="preference" name="preference" value={preference} onChange={validateSexualPreference} className={classes.radio}>
                    <FormControlLabel value="both" control={<Radio />} label="Males and females" />
                    <FormControlLabel value="males" control={<Radio />} label="Males only" />
                    <FormControlLabel value="females" control={<Radio />} label="Females only" />
                </RadioGroup>
            </FormControl>

            <TextField
                variant="outlined"
                // margin="normal"
                value={biography}
                fullWidth
                id="biography"
                label="biography"
                name="biography"
                onChange={validateBiography}
                // autoFocus
                className={classes.bio}
            />


    

















          <Button
              onClick={send_data}
            //   type='submit'
              fullWidth
              variant="contained"
              color="primary"
            >
              Save this section
            </Button>
            </form>
        </Paper>
        </>
    )
}

export default BasicInfo