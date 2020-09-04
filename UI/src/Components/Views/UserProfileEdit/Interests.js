import React, {useState, useEffect, useRef, useContext }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { getAllInterests } from '../../../Services/interests'
import { Paper, Chip, TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'


const useStyle = makeStyles({
	chip: {
		margin: "1rem"
	}
})

const Interests = (props) => {
	const forceUpdate = useForceUpdate()
	const [interestArray, setInterestArray] = useState(props.user.data.interests)
	let suggestedInterests=[]

	useEffect(() => {
		getAllInterests(({data}) =>{suggestedInterests = data }, (err)=>{})
	}, )
	return (
	<>
		<Paper elevation={2} >
			<Typography>Interests</Typography>
			{interestArray ? interestArray.map( (interest, index) => <Interest key={index} index={index} interest={interest} interestArray={interestArray} setInterestArray={setInterestArray} forceUpdate={forceUpdate}/> ): "No interests 😥"}
			<Typography>Interests</Typography>
			{ suggestedInterests}
			{/* <TextField variant="outlined" value={interest.value} error={interest.error} label="#interest" name="interest" onChange={validateInterestInput} autoFocus fullWidth/> */}
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

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const arrayRemove = (array, element) => {
	const index = array.indexOf(element)

	if (index > -1) {
		array.splice(index, 1) 
	}
	return array
}
export default Interests