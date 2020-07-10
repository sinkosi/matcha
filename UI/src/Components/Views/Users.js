import React, {useState}  from 'react'
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header'
import getUsers from '../../Services/users'
import { Button, Container, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useUserStyles = makeStyles({
    root: {
        maxWidth: 345,
        padding: 5,
        margin: 5,
        elevation: 4
    },
    media: {
        height: 300
    },
});

const User = (props) => {
    const classes = useUserStyles();
    let history = useHistory();

    const userUrl = "/users/"+props.user.id
    function handleClick() {
        history.push(userUrl);
    }
    return (
        <Card className={classes.root} raised>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    className={classes.media}
                    image={props.user.image_url}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom align="center" variant="h5" component="h2">{props.user.username}</Typography>
                    <Typography gutterBottom align="center" variant="h5" component="h3">{props.user.firstname} {props.user.lastname}</Typography>
                    
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const Users = (props) => {
    const [users, setUsers] = useState({data: []})

    const refresh = () => { getUsers(setUsers) }
    const logusers = () => console.log(users)
    return (
        <>
            <Header />
            <Button onClick={refresh} >reload</Button>
            <Button onClick={logusers} >log users</Button>
            <Container maxWidth="lg" align="center">
                <Grid container spacing={2}>
                    
                        { users.data.map(user => <Grid  key={user.id} item md={4} lg={3} > <User user={user} /> </Grid> ) }
                    
                </Grid>
            </Container>
        </>
    )
}


export default Users