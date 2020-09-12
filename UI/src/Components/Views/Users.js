import React, {useState, useEffect, useRef, useContext }  from 'react'
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import getUsers from '../../Services/users'
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
	filterMenuBackground: {
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

const Users = (props) => {
	const [users, setUsers] = useState({data: []})
	const [query, setQuery] = useState("")
	const [loading, setLoading] = useState(1)
	const [hideFilterMenu, setHideFilterMenu] = useState(true);
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

	const handleMenuClick = (event) => {
		setHideFilterMenu(!hideFilterMenu)
	}
	const handleMenuClickAway = () => {
		if (!hideFilterMenu)
			handleMenuClick()
	}

	return (
		<>
			<ClickAwayListener onClickAway={handleMenuClickAway}>
				<div>
					<Button onClick={handleMenuClick}><FilterListIcon />Filter</Button>
					<FilterMenu {...props} setQuery={setQuery} hidden={hideFilterMenu} user={userData.data}/>
				</div>
			</ClickAwayListener>
	
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

const FilterMenu = (props) => {
	const classes = useUserStyles()
	const [order, setOrder] = useState("ascending")
	const [sort, setSort] = useState("popularity")
	const [filterGender, setFilterGender] = React.useState({ males: (props.user.sexual_preferences === "males"), females: (props.user.sexual_preferences === "females"),	bisexual: (props.user.sexual_preferences === "both") });
	const [filterCity, setFilterCity] = React.useState({ Johannesburg: false, Pretoria: false, Germiston:false, Tembisa: false, Others: false });
	const [filterPopularity, setFilterPopularity] = React.useState({lessThan3:false, lessThan5:false, moreThan5:false});
	const x = 0;
	
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
	const handleChangeFilterCity = (event) => {
		setFilterCity({ ...filterCity, [event.target.name]: event.target.checked });
	};
	const handleChangeFilterPopularity = (event) => {
		setFilterPopularity({ ...filterPopularity, [event.target.name]: event.target.checked });
	};

	const generateQuerySting = () => {
		let filterStr = ""

		let g = ""
		if (filterGender.males || filterGender.females || filterGender.bisexual){
			if (filterGender.males)
				g += "gender[]=males"
			if (g.length && (filterGender.females || filterGender.bisexual))
				g += "&"
			if (filterGender.females)
				g += "gender[]=females"
			if (g.length && filterGender.bisexual)
				g += "&"
			if (filterGender.bisexual)
				g += "gender[]=bisexual"
		} else {
			g = "gender=males&gender=females&gender=bisexual"
		}
		let c = ""
		if (filterCity.Johannesburg || filterCity.Pretoria || filterCity.Germiston || filterCity.Others){
			if (filterCity.Johannesburg)
				c += "city[]=Johannesburg"
			if (c.length && (filterCity.Pretoria || filterCity.Germiston || filterCity.Others))
				c += "&"
			if (filterCity.Pretoria)
				c += "city[]=Pretoria"
			if (c.length && (filterCity.Germiston || filterCity.Others))
				c += "&"
			if (filterCity.Germiston)
				c += "city[]=Germiston"
			if (c.length && filterCity.Others)
				c += "&"
			if (filterCity.Others)
				c += "city[]=Others"
		} else {
			c = "city=Johannesburg&city=Pretoria&city=Germiston&city=Others"
		}
		let p = ""
		if (filterPopularity.lessThan3 || filterPopularity.lessThan5 || filterPopularity.moreThan5){
			if (filterPopularity.lessThan3)
				p += "popularity[]=lt3"
			if (p.length && (filterPopularity.lessThan5 || filterPopularity.moreThan5))
				p += "&"
			if (filterPopularity.lessThan5)
				p += "popularity[]=lt5"
			if (p.length && filterPopularity.moreThan5)
				p += "&"
			if (filterPopularity.moreThan5)
				p += "popularity[]=mt5"
		} else {
			p = "popularity=lt3&popularity=lt5&popularity=mt5"
		}
		filterStr = ""
		filterStr += g
		if (filterStr.length && (c.length || p.length))
			filterStr += "&"
		filterStr += c
		if (filterStr.length && p.length)
			filterStr += "&"
		filterStr += p

		filterStr += `&sort=${sort}`
		filterStr += `&order=${order}`
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


	return (
		<>
			<Paper className={classes.filterMenuBackground} hidden={props.hidden}>
				<Grid container align="left">
					<Grid container item xs={12} sm={6}>
						<FormGroup  component="fieldset">
							<FormLabel component="legend" >Gender</FormLabel>
							<FormControlLabel control={<Checkbox checked={filterGender.males} onChange={handleChangeFilterGender} name="males" />} label="Males" />
							<FormControlLabel control={<Checkbox checked={filterGender.females} onChange={handleChangeFilterGender} name="females" />} label="Females" />
							<FormControlLabel control={<Checkbox checked={filterGender.bisexual} onChange={handleChangeFilterGender} name="bisexual" />} label="Bisexual" />
						</FormGroup>
						<FormGroup  component="fieldset">
							<FormLabel component="legend" >City</FormLabel>
							<FormControlLabel control={<Checkbox checked={filterCity.Johannesburg} onChange={handleChangeFilterCity} name="Johannesburg" />} label="Johannesburg" />
							<FormControlLabel control={<Checkbox checked={filterCity.Pretoria} onChange={handleChangeFilterCity} name="Pretoria" />} label="Pretoria" />
							<FormControlLabel control={<Checkbox checked={filterCity.Germiston} onChange={handleChangeFilterCity} name="Germiston" />} label="Germiston" />
							<FormControlLabel control={<Checkbox checked={filterCity.Others} onChange={handleChangeFilterCity} name="Others" />} label="Other Cities" />
						</FormGroup>
						<FormGroup  component="fieldset">
							<FormLabel component="legend" >Popularity</FormLabel>
							<FormControlLabel control={<Checkbox checked={filterPopularity.lessThan3} onChange={handleChangeFilterPopularity} name="lessThan3" />} label="3 Stars or less" />
							<FormControlLabel control={<Checkbox checked={filterPopularity.lessThan5} onChange={handleChangeFilterPopularity} name="lessThan5" />} label="Between 3 and 5" />
							<FormControlLabel control={<Checkbox checked={filterPopularity.moreThan5} onChange={handleChangeFilterPopularity} name="moreThan5" />} label="Greater than 5" />
						</FormGroup>
					</Grid>
					<Grid container item xs={12} sm={3}>
						<FormControl component="fieldset">
							<FormLabel component="legend" color="primary">Sort</FormLabel>
							<RadioGroup id="gender" aria-label="gender" name="gender" value={sort} onChange={handleSortChange} className={classes.radio}>
								<FormControlLabel value="popularity" control={<Radio />} label="Popularity" />
								<FormControlLabel value="distance" control={<Radio />} label="Distance" disabled/>
								<FormControlLabel value="age" control={<Radio />} label="Age" disabled/>
								<FormControlLabel value="tags" control={<Radio />} label="Common Interest tags" disabled/>
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
					</Grid>
				</Grid>
			</Paper>
		</>

	)
}

export default Users