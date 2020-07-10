import React, {useState, Redirect}  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header'
import getUser from '../../Services/user'
import { Button, Container, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        backgroundColor: "grey"
    }
});

const UserProfile = (props) => {
    const classes = useStyles();
    const [user, setUser] = useState({data: []})
    // const userId = user.id
    const userId = "035ef5da-16d6-4c79-bae6-ed0b602c7fb1"
    const refresh = () => { getUser(setUser, userId ) }
    const loguser = () => console.log(user)
    return (
        <>
            <Header />
            <Button onClick={refresh} variant="contained">refresh</Button>
            <Button onClick={loguser} variant="contained">log user</Button>
            <Container maxWidth="lg" className={classes.root}>
                <Typography align="center" variant="h3" component="h1">{user.data.firstname} {user.data.lastname}</Typography>
                <Grid container  maxWidth="lg">
                </Grid>
            </Container>
        </>
    )
}


export default UserProfile