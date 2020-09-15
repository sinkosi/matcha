import React, {useState, useEffect }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { getAllInterests } from '../../../Services/interests'
import { updateInterests } from '../../../Services/profile'
import { Paper, Chip, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add';

const useStyle = makeStyles({
	chip: {
		margin: "1rem"
	},
	paper: {
		width:'100%',
		padding: '1rem',
		height:'100%'
	}

})

const Interests = (props) => {
	//const forceUpdate = useForceUpdate()
	const [interestArray, setInterestArray] = useState(props.user.data.interests)
	const [suggestedInterests, setSuggestedInterests] = useState([])
	const x = 1;
	const classes = useStyle()

	useEffect(() => {
		getAllInterests(({data}) =>{ console.log(data); setSuggestedInterests(data) }, (err)=>{})
	}, [x])

	const send_data = () => {
		updateInterests(()=>{}, ()=>{}, props.user.data.id, interestArray)
	}
	return (
	<>
		<Paper elevation={2} className={classes.paper}>
			<Typography>Your Interests</Typography>
			{interestArray ? interestArray.map( (interest, index) => <Interest key={index} index={index} interest={interest} interestArray={interestArray} setInterestArray={setInterestArray} /*forceUpdate={forceUpdate}*//> ): "No interests 😥"}

			
				<Typography>Suggestions</Typography>
					{ suggestedInterests.map( (interest, index) => 
						interestArray.indexOf(interest) < 0 ? <InterestAdder key={index} index={index} interest={interest} interestArray={interestArray} setInterestArray={setInterestArray} /*forceUpdate={forceUpdate}*//> : <></> ) }
			
			
			{/* <TextField variant="outlined" value={interest.value} error={interest.error} label="#interest" name="interest" onChange={validateInterestInput} autoFocus fullWidth/> */}
			<Button onClick={send_data}
					//   type='submit'
						fullWidth
						variant="contained"
						color="primary"
					>
						Save Interests
					</Button>
		</Paper>
	</>
	)
}

const Interest = (props) => {
	const classes = useStyle();

	const handleDelete = (e) => {
		let arr = props.interestArray

		arr = arrayRemove(arr, props.interest)
		props.setInterestArray(arr)
		props.forceUpdate()
	}
	return (
		<>
			<Chip label={props.interest} onDelete={handleDelete} color="secondary"  className={classes.chip}/>
		</>
	)
}

const InterestAdder = (props) => {
	const classes = useStyle();

	// const handleDelete = (e) => {
	// 	let arr = props.interestArray

	// 	arr = arrayRemove(arr, props.interest)
	// 	props.setInterestArray(arr)
	// 	props.forceUpdate()
	// }

	const handleAdd = () => {
		let arr = props.interestArray
		
		arr = arrayAdd(arr, props.interest)
		props.setInterestArray(arr)
		props.forceUpdate()
	}

	return (
		<>
			<Chip label={props.interest} onDelete={handleAdd} color="primary" deleteIcon={<AddIcon />} className={classes.chip}/>
		</>
	)
}
/*
function useForceUpdate(){
    const [, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}
*/
const arrayRemove = (array, element) => {
	const index = array.indexOf(element)

	if (index > -1) {
		array.splice(index, 1) 
	}
	return array
}

const arrayAdd = (array, element) => {
	const index = array.indexOf(element)

	if (index === -1) {
		array.push(element) 
	}
	return array
}
export default Interests