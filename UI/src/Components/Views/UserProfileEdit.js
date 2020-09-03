import React, {useState, useEffect, useRef, useContext }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import getUser from '../../Services/user'
import { Container, Grid, Paper, TextField, Button, RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../UserContext'

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
    }
});

const UserProfileEdit = (props) => {
    const classes = useStyles();
    const [user, setUser] = useState({data: []})
    const {userData} = useContext(UserContext)
    let userRef = useRef()
    const userId = userData.data.id 
    userRef.current = user.data


    useEffect(() => {getUser(setUser, userId )}, [userId])

    console.log({user})
    return (
        user.data.id ?  
        <>
            <Container maxWidth="lg" className={classes.root}>
                <Typography align="center" variant="h3" component="h1" className={classes.title}>{user.data.firstname} {user.data.lastname}</Typography>
                <Grid container spacing={3}>
                    <Grid item md={6} align="center">
                        <Paper elevation={2} className={classes.paper} wrap="nowrap">
                            <img src={user.data.profile_pic} alt={user.data.firstname+"'s profile pic"} className={classes.image} />
                        </Paper>
                    </Grid>
                    <Grid item md={6} >
                        <BasicInfo {...props} user={user}/>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Paper elevation={2} className={classes.paper}>
                            <Typography>Interests</Typography>
                            {user.data.interests ? user.data.interests.map( (interest, index) => <p key={index}>{interest} </p>): "No interests 😥"}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Paper elevation={2} className={classes.paper}>
                            <Typography>Images</Typography>
                            <Grid container >
                                {user.data.images
                                    ? user.data.images.map( (image) => 
                                        <Grid item  xs={12} md={6} lg={4} key={image.id}> <img src={image.url} alt="" className={classes.images}/> 
                                        </Grid>)
                                    : <Grid item align="center"> "No images <span role='img' aria-label="">😥</span>" </Grid>}
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </>
        : <></>
    )
}

const BasicInfo = (props) => {
    const [username, setusername] = useState({'value':props.user.data.username, 'error':false, 'errormsg':''})
    const [firstname, setfirstname] = useState({'value':props.user.data.firstname, 'error':false, 'errormsg':''})
    const [lastname, setlastname] = useState({'value':props.user.data.lastname, 'error':false, 'errormsg':''})
    const [email, setemail] = useState({'value':props.user.data.email, 'error':false, 'errormsg':''})
    const [gender, setGender] = React.useState('bisexual')
    const [preference, setPreference] = React.useState('both')
    var [biography, setBiography] = React.useState("")


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

    //   const send_data = () => {
    //     const formdata = {'username':username.value, 'firstname':firstname.value, 'lastname':lastname.value, 'email':email.value, 'password':password.value}
    //     console.log(formdata)
    //     register(formdata, handleSuccess, handleError)
    //   }
    
    //   const handleSuccess = (response) => {
    //     console.log({response})
    //     browserHistory.push('/registrationsuccessful')
    //   }
    
    //   const handleError = (error) =>{
    //     console.log({error})
    //   }
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
                autoFocus
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
                <RadioGroup aria-label="gender" name="gender" value={gender} onChange={validateGender} >
                    <FormControlLabel value="bisexual" control={<Radio />} label="Bisexual" disabled />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>

            <RadioGroup aria-label="preference" name="preference" value={preference} onChange={validateSexualPreference} >
                <FormControlLabel value="both" control={<Radio />} label="Males and females" />
                <FormControlLabel value="males" control={<Radio />} label="Males only" />
                <FormControlLabel value="females" control={<Radio />} label="Females only" />
            </RadioGroup>

            <TextField
                variant="outlined"
                // margin="normal"
                value={biography}
                fullWidth
                id="biography"
                label="biography"
                name="biography"
                onChange={validateBiography}
                autoFocus
            />

          
            
    

















          <Button
            //   onClick={send_data}
              type='submit'
              fullWidth
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            </form>
        </Paper>
        </>
    )
}

export default UserProfileEdit