import React, {useState, useEffect, useRef}  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import getUser from '../../Services/user'
import { Button, Container, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {

    },
    image: {
        maxWidth: 345,
      }
});

const UserProfile = (props) => {
    const classes = useStyles();
    const [user, setUser] = useState({data: []})

    let userRef = useRef()
    userRef.current = user.data
    const userId = props.location.pathname.split("/")[2]
    const refresh = () => { getUser(setUser, userId ) }
    const loguser = () => console.log(user)
    useEffect(() => {refresh()}, [userRef])
    return (
        <>
            <Button onClick={refresh} variant="contained">refresh</Button>
            <Button onClick={loguser} variant="contained">log user</Button>
            <Container maxWidth="lg" className={classes.root}>
                <Typography align="center" variant="h3" component="h1">{user.data.firstname} {user.data.lastname}</Typography>
                <Grid container spacing={3}>
                    <Grid item md={6} align="center">
                        <img src={user.data.image_url} alt="" />
                    </Grid>
                    <Grid item md={6} container spacing={3}>
                        <Grid item xs={6}>
                            <Typography>Username: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{user.data.username}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Firstname: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{user.data.firstname}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Lastname: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{user.data.lastname}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Gender: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{user.data.gender}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Sexual Preference: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{user.data.sexual_preferences}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Email: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{user.data.email}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Biography: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{user.data.biography}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


export default UserProfile