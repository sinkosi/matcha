import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { deleteCookie } from '../utils/cookies'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  let browserHistory = useHistory();

  const handleLogout = () => {
    deleteCookie('token')
    deleteCookie('loginData')
    props.setUserData({'loggedIn': false})
  }

  const handleSuggestions = () => { browserHistory.push('/users') }
  const handleSearch = () => { browserHistory.push('/users' ) }
  const handleProfile = () => { browserHistory.push('/profile') }
  const handleChats = () => { browserHistory.push('/chat') }
  const handleNotifications = () => { browserHistory.push('/notifications') }
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Matcha
          </Typography>
          <Button color="inherit" onClick={handleSuggestions}>Suggestions</Button>
          <Button color="inherit" onClick={handleSearch}>Search</Button>
          <Button color="inherit" onClick={handleChats}>Chats</Button>
          <Button color="inherit" onClick={handleNotifications}>Notifications</Button>
          <Button color="inherit" onClick={handleProfile}>Profile</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
