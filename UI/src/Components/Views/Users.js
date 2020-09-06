import React, {useState, useEffect, useRef }  from 'react'
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import getUsers from '../../Services/users'
import { Container, Grid, Button, Paper, RadioGroup, FormControl, Radio, FormControlLabel, FormLabel, FormGroup, Checkbox } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList'


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
	filterMenuBackground: {
		width: "100%",
		padding: "1rem"
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

const Users = (props) => {
	const [users, setUsers] = useState({data: []})


	let usersRef = useRef(0)
	usersRef.current = users.data

	useEffect(() => {getUsers(setUsers) }, [usersRef])
	return (
		<>
			<Button><FilterListIcon />Filter</Button>
			<FilterMenu {...props} />
			<Container maxWidth="lg" align="center">
				<Grid container spacing={2}> 
					{ users.data ? users.data.map(user => <Grid item align="center"  key={user.id}  xs={12} sm={6} md={4} lg={3} > <User user={user} /> </Grid> ) : ""}
				</Grid>
			</Container>
		</>
	)
}

const FilterMenu = (props) => {
	const classes = useUserStyles()
	const [order, setOrder] = useState("ascending")
	const [sort, setSort] = useState("popularity")
	const [filterGender, setFilterGender] = React.useState({ males: false, females: false,	bisexual: false });
	
	const handleOrderChange = (event) => {
		console.log(event.target.value)
		setOrder(event.target.value)
	}

	const handleSortChange = (event) => {
		console.log(event.target.value)
		setSort(event.target.value)
	}

	const handleChangeFilterGender = (event) => {
		setFilterGender({ ...filterGender, [event.target.name]: event.target.checked });
	  };


	return (
		<>
			<Paper className={classes.filterMenuBackground} hidden={false}>
				<Grid container align="left">
					<Grid container item xs={12} sm={6}>
						<FormGroup row component="fieldset">
							<FormLabel component="legend" >Gender</FormLabel>
							<FormControlLabel control={<Checkbox checked={filterGender.males} onChange={handleChangeFilterGender} name="males" />} label="Males" />
							<FormControlLabel control={<Checkbox checked={filterGender.females} onChange={handleChangeFilterGender} name="females" />} label="Females" />
							<FormControlLabel control={<Checkbox checked={filterGender.bisexual} onChange={handleChangeFilterGender} name="bisexual" />} label="Bisexual" />
						</FormGroup>
					</Grid>
					<Grid container item xs={12} sm={3}>
						<FormControl component="fieldset">
							<FormLabel component="legend" color="primary">Sort</FormLabel>
							<RadioGroup id="gender" aria-label="gender" name="gender" value={sort} onChange={handleSortChange} className={classes.radio}>
								<FormControlLabel value="popularity" control={<Radio />} label="Popularity" />
								<FormControlLabel value="distance" control={<Radio />} label="Distance" />
								<FormControlLabel value="age" control={<Radio />} label="Age" />
								<FormControlLabel value="tags" control={<Radio />} label="Common Interest tags" />
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid container item xs={12} sm={3}>
						<FormControl component="fieldset">
							<FormLabel component="legend" color="primary">Order</FormLabel>
							<RadioGroup id="gender" aria-label="gender" name="gender" value={order} onChange={handleOrderChange} className={classes.radio}>
								<FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
								<FormControlLabel value="descending" control={<Radio />} label="Descending" />
							</RadioGroup>
						</FormControl>
						<Button color="primary" variant="outlined">Filter</Button>
					</Grid>
				</Grid>
			</Paper>
		</>

	)
}

export default Users