import React, {useState, useEffect, useRef, useContext }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import getUser from '../../Services/user'
import { getUserInteractions, sendLike, sendUnlike, sendBlock, sendUnblock } from '../../Services/user'
import { Container, Grid, Paper, Fab, Tooltip } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../UserContext'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
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
	margin: {
		margin: theme.spacing(1),
	},
	fabLike: {
		margin:"0.5rem"
	},
	fabBlock: {
		margin: "0.5rem"
	},
	fabs: {
		position: 'fixed',
		right: '1rem',
		bottom: '1rem'
	}
}));

const UserProfile = (props) => {
	const classes = useStyles();
	const [user, setUser] = useState({data: []})
	const {userData} = useContext(UserContext)
	let userRef = useRef()
	let history = useHistory()
	const userId = (props.path === "/profile" ? userData.data.id : props.location.pathname.split("/")[2])

	if (props.path !== "/profile" && props.location.pathname.split("/")[2] === userData.data.id) {
		history.push("/profile")
	}
	userRef.current = user.data

	const handleClickEdit = (event) => {
		history.push("/profile/edit")
	}

	const handleLike = (event) => {
		sendLike( (result) => {getUser(setUser, userId )},
		(err) => {},
		userId)
	}
	const handleUnlike = (event) => {
		sendUnlike( (result) => {getUser(setUser, userId )},
		(err) => {},
		userId)
	}

	const handleBlock = (event) => {
		sendBlock( (result) => {getUser(setUser, userId )},
		(err) => {},
		userId)
	}
	const handleUnblock = (event) => {
		sendUnblock( (result) => {getUser(setUser, userId )},
		(err) => {},
		userId)
	}

	

	useEffect(() => {getUser(setUser, userId )}, [userId])

	return (
		<>
			<Container maxWidth="lg" className={classes.root}>
				<Typography align="center" variant="h3" component="h1" className={classes.title}>
					{user.data.firstname} {user.data.lastname}
					<Tooltip title="{}">
						<Typography>
							[{user.data.popularity}]
						</Typography>
					</Tooltip>
				</Typography>
				<Grid container spacing={3}>
					<Grid item md={6} align="center">
						<Paper elevation={2} className={classes.paper} wrap="nowrap">
							<img src={user.data.profile_pic} alt={user.data.firstname+"'s profile pic"} className={classes.image} />
						</Paper>
					</Grid>
					<Grid item md={6} >
						<Paper elevation={2} className={classes.paper}>
							<Grid container spacing={3}>
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
						</Paper>
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
				{props.path === "/profile" ? <Interactions {...props} userId={userId}></Interactions> : "" }
			</Container>
			{ props.path === "/profile" ? 
				<Fab variant="extended" size="large" color="secondary" aria-label="edit profile" className={classes.fab} onClick={handleClickEdit} >Edit profile</Fab>
				: <div className={classes.fabs}>
						{ user.data.isLiked ? 
							<Fab variant="extended" size="large" color="secondary" aria-label="edit profile" className={classes.fabLike} onClick={handleUnlike} >Unlike</Fab>
							: <Fab variant="extended" size="large" color="secondary" aria-label="edit profile" className={classes.fabLike} onClick={handleLike} >Like</Fab>
						}
						{/* {	user.data.isBlocked ?
							<Fab variant="extended" size="large" color="secondary" aria-label="unblock user" className={classes.fabBlock} onClick={handleUnblock} >Unblock</Fab>
							: <Fab variant="extended" size="large" color="secondary" aria-label="block user" className={classes.fabBlock} onClick={handleBlock} >Block</Fab>
						} */}
						<Fab variant="extended" size="large" color="secondary" aria-label="unblock user" className={classes.fabBlock} onClick={handleUnblock} >Unblock</Fab>
						<Fab variant="extended" size="large" color="secondary" aria-label="block user" className={classes.fabBlock} onClick={handleBlock} >Block</Fab>
				</div>
			}
		</>
	)
}

const Interactions = (props) => {
	const [interactions, setInteractions] = useState({data: null});
	const interactionRef = useRef()

	interactionRef.current = interactions.data;
	useEffect(() => {
		getUserInteractions(setInteractions, props.userId)
	}, [interactionRef, props.userId])

	const classes = useStyles()
	return (
		<>
			<Typography align="center" variant="h3" component="h1" className={classes.title}> Interations </Typography>

			<Grid container justify="center" spacing={1}>
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} align="center">
					<Paper elevation={2} className={classes.paper}>
						<Typography variant="h6">Profiles you visited</Typography>
						
							{interactions.data
								? interactions.data.profilesVisited.map( (profile) => 
									<Typography key={profile.id}>{profile.username}</Typography> )
								: <Typography> "You never visited anyone <span role='img' aria-label="">😥</span>" </Typography>}

					</Paper>
				</Grid>

				<Grid item xs={12} sm={6} md={4} lg={3} xl={2} align="center">
					<Paper elevation={2} className={classes.paper}>
						<Typography variant="h6">users who viewed your profile</Typography>
						
							{interactions.data
								? interactions.data.visitors.map( (profile) => 
									<Typography key={profile.id}>{profile.username}</Typography> )
								: <Typography> "No one visited your profile yet <span role='img' aria-label="">😥</span>" </Typography>}

					</Paper>
				</Grid>

				<Grid item xs={12} sm={6} md={4} lg={3} xl={2} align="center">
					<Paper elevation={2} className={classes.paper}>
						<Typography variant="h6">Profiles you Liked</Typography>
						
							{interactions.data
								? interactions.data.profilesLiked.map( (profile) => 
									<Typography key={profile.id}>{profile.username}</Typography> )
								: <Typography> "You haven't liked anyone <span role='img' aria-label="">😥</span>" </Typography>}

					</Paper>
				</Grid>

				<Grid item xs={12} sm={6} md={4} lg={3} xl={2}  align="center">
					<Paper elevation={2} className={classes.paper}>
						<Typography variant="h6">People who like your profile</Typography>
						
							{interactions.data
								? interactions.data.likes.map( (profile) => 
									<Typography key={profile.id}>{profile.username}</Typography> )
								: <Typography> "No one liked your profile yet <span role='img' aria-label="">😥</span>" </Typography>}

					</Paper>
				</Grid>

				<Grid item xs={12} sm={6} md={4} lg={3} xl={2} align="center">
					<Paper elevation={2} className={classes.paper}>
						<Typography variant="h6">Matches</Typography>
						
							{interactions.data
								? interactions.data.matches.map( (profile) => 
									<Typography key={profile.id}>{profile.username}</Typography> )
								: <Typography> "you haven't got a match yet <span role='img' aria-label="">😥</span>" </Typography>}

					</Paper>
				</Grid>
			</Grid>
		</>
	)
}


export default UserProfile