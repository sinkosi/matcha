import React, {useState, useEffect, useRef, useContext }  from 'react'
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import {getUsers} from '../../Services/interests'
import { Container, Grid, Button, Paper, RadioGroup, FormControl, Radio, FormControlLabel, FormLabel, FormGroup, Checkbox, ClickAwayListener, Chip } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList'
import { UserContext } from '../UserContext'


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
	tagsBG: {
		width: "100%",
		padding: "1rem"
	},
	popularityChip:{
		position: "absolute",
		left: "0"	
	}
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
				<Chip label={props.user.popularity} className={classes.popularityChip} />
				<CardMedia
					className={classes.media}
					image={props.user.profile_pic}
					title={props.user.firstname+"'s profile picture"}
				/>
				<CardContent>
					<Typography gutterBottom align="center" variant="h5" component="h2">{props.user.username}</Typography>
					<Typography gutterBottom align="center" variant="h5" component="h3">{props.user.firstname} {props.user.lastname}</Typography>                    
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

const UsersByTags = (props) => {
	const [users, setUsers] = useState({data: []})
	const [query, setQuery] = useState("")
	const [loading, setLoading] = useState(1)
	const {userData} = useContext(UserContext)

	let usersRef = useRef(0)
	usersRef.current = users.data

	useEffect(() => {
		 const f =() => {
			if (query.length){
				getUsers(setUsers, query);
				console.log("fetching user using query", query) 
			}
		
		}
		f()
	 }, [usersRef,query, loading])

	useEffect(() => {
		setLoading(0)
	}, [users.data.length])



	return (
		<>

					<Tags {...props} setQuery={setQuery}  user={userData.data}/>

			<Container maxWidth="lg" align="center">
				{	loading ? <p>loading...</p> :
					<Grid container spacing={2}> 
						{ users.data ? users.data.map(user => <Grid item align="center"  key={user.id}  xs={12} sm={6} md={4} lg={3} > <User user={user} /> </Grid> ) : ""}
					</Grid> 
				}
			</Container>
		</>
	)
}

const Tags = (props) => {
	const classes = useUserStyles()
	const x = 0;
	const user = props.user
	


	const generateQuerySting = () => {
		let filterStr = ""

		props.setQuery(filterStr)
	}
	const g = generateQuerySting
	useEffect(() => {
		const f = () => {
			g()
			console.log("executing generateQueryString")
		}
		f()
		return () => {
			console.log("filter component effect cleanup")
		}
	}, [x, g])

	console.log(user)
	return (
		<>
			<Paper className={classes.tagsBG} >

			</Paper>
		</>

	)
}

export default UsersByTags