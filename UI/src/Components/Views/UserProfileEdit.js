import React, {useState, useEffect}  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header'
import getUser from '../../Services/user'
import { Button, Container, Grid, TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
    root: {
        backgroundColor: "grey"
    },
    image: {
        maxWidth: 345,
      }
});

const UserProfileEdit = (props) => {
    const classes = useStyles();
    const [user, setUser] = useState({data: []})

    const userId = props.location.pathname.split("/")[2]
    const refresh = () => { getUser(setUser, userId ) }
    const loguser = () => console.log(user)
    //useEffect(()=> refresh())
    return (
        <>
            <Header />
            <Button onClick={refresh} variant="contained">refresh</Button>
            <Button onClick={loguser} variant="contained">log user</Button>
            <Container maxWidth="lg" className={classes.root}>
                <Typography align="center" variant="h3" component="h1">{user.data.firstname} {user.data.lastname}</Typography>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <img src={user.data.image_url} alt="" />
                    </Grid>
                    <Grid item md={6} container spacing={3}>
                    <form className={classes.root}  autoComplete="off">
                        
                        <TextField id="username" label="username" required disabled fullWidth value={user.data.username} />
                    </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


export default UserProfileEdit