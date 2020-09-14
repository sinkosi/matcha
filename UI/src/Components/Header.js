import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { deleteCookie } from '../utils/cookies'
import { useHistory } from 'react-router-dom';
import { Hidden, Paper, ClickAwayListener } from '@material-ui/core';

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
	menu:{
		position: "absolute",
		top: "3.5rem",
		right: "0rem",
		width: "auto",
		padding: "0.5rem",
	
	},
	menuItem:{

		width: "100%"
	}
}));

export default function Header(props) {
	const classes = useStyles();
	let browserHistory = useHistory();
	const [hideMenu, setHideMenu] = useState(true);

	const handleLogout = () => {
		deleteCookie('token')
		deleteCookie('loginData')
		props.setUserData({'loggedIn': false})
	}

	const handleSuggestions = () => { browserHistory.push('/users') }
	const handleSearch = () => { browserHistory.push('/users' ) }
	const handleProfile = () => { browserHistory.push('/profile') }
	const handleChats = () => { browserHistory.push('/chat') }
	// const handleNotifications = () => { browserHistory.push('/notifications') }
	
	const handleMenuClick = (event) => {
			setHideMenu(!hideMenu)
	}
	const handleMenuClickAway = () => {
		if (!hideMenu)
			handleMenuClick()
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
			
					<Typography variant="h6" className={classes.title}>
						Matcha
					</Typography>
					<Hidden xsDown>
						<Button color="inherit" onClick={handleSuggestions}>Users</Button>
						<Button color="inherit" onClick={handleSearch}>Search</Button>
						<Button color="inherit" onClick={handleChats}>Chat</Button>
						<Button color="inherit" onClick={handleProfile}>Profile</Button>
					</Hidden>
						<Button color="inherit" onClick={handleLogout}>Logout</Button>
					<Hidden smUp>
						<ClickAwayListener onClickAway={handleMenuClickAway}>
							<div>
								<IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenuClick}>
									<MenuIcon />
								</IconButton>
								<Paper id="menu" className={classes.menu} hidden={hideMenu}>
									<Button className={classes.menuItem} fullWidth onClick={handleSuggestions}> Users</Button>
									{/* <Button ClassName={classes.menuItem} fullWidth> Search</Button> */}
									<Button className={classes.menuItem} fullWidth onClick={handleProfile}> Profile</Button>
								</Paper>
							</div>
						</ClickAwayListener>
					</Hidden>
				</Toolbar>
			</AppBar>
		</div>
	);
}
