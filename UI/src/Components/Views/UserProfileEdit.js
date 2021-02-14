import React, {useState, useEffect, useRef, useContext }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import getUser from '../../Services/user'
import BasicInfo from './UserProfileEdit/BasicInfo'
import Password from './UserProfileEdit/Password'
import Images from './UserProfileEdit/Images'
import { Container, Grid, Paper } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { UserContext } from '../UserContext'
import Interests from './UserProfileEdit/Interests';

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

const UserProfileEdit = (props) => {
	const classes = useStyles();
	const [user, setUser] = useState({data: []})
	const {userData, setUserData} = useContext(UserContext)
	let userRef = useRef()
	const userId = userData.data.id 
	userRef.current = user.data


	useEffect(() => {
		getUser( (res) => {
			setUser(res)
			setUserData({...userData, data:res.data})
		}, userId )
	}, [userId, userData, setUserData ])

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
					<Grid item md={6} >
						<Password {...props} user={user}/>
					</Grid>
					<Grid item xs={12} align="center">
						<Interests {...props} user={user}/>
					</Grid>
					<Grid item xs={12} align="center">
						<Images {...props} user={user} />
					</Grid>

				</Grid>
			</Container>
		</>
		: <></>
	)
}

export default UserProfileEdit