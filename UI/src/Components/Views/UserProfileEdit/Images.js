import React, {useState, useEffect}  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {getUserImages, deleteImage} from '../../../Services/images'
import { uploadImage, updateProfilePic} from '../../../Services/profile'
import { Grid, Paper, Button, ButtonGroup } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';


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
		padding: "0",
		paddingBottom: "0"
    },
    radio: {
        marginLeft: "1rem",
        marginBottom: "1rem"
    },
    bio: {
        marginBottom: "1rem"
	},
	imagebtngr: {
		marginTop: "",
	},
	imagecard: {
		padding: "1rem",
		margin: "0.7rem",
		height: "100%"
	},
	input: {
		display: "none"
	}
});

const handleSendImage = ( success, error, userId, image, images, setImage) => {
	// const userId = cookieUserId()
	if (image && userId && images.length < 5)
		uploadImage(success, error, userId, image )

}

const Images = (props) => {
	const classes = useStyles()
	const [images, setImages] = useState({data: []})
	const [image, setImage] = useState(null)
	const userId = props.user.data.id;
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		getUserImages(props.user.data.id, setImages, (err) => {})
	}, [props.user.data.id])


	const update = () => {
		getUserImages(props.user.data.id, setImages, (err) => {})
	}

	const handleImageChange = (event) => {
		let file = event.target.files[0]
		let reader = new FileReader();
		
		reader.onloadend = function () {
			var b64 = reader.result.replace(/^data:.+;base64,/, '');
			setImage( {
				'name': file.name,
				'type': file.type,
				'size': file.size,
				'data': b64
			} );
		};
		
			reader.readAsDataURL(file);
	};
	
	useEffect(() => {
		handleSendImage((res)=>{setImage(null); getUserImages(userId, setImages, (err) => {})}, ()=>{}, userId, image, images.data)
		return () => {
			setImage(null)
		}
	}, [userId, image, images.data])

	return (
	<>
		<Paper elevation={2} className={classes.paper}>
			<Typography>Images</Typography>
			<Grid container spacing={2} >
				{ images.data.length
					? images.data.map( (image) => 
						<Grid item  xs={12} md={6} lg={4} key={image.id}> <Image image={image} update={update} forceUpdate={forceUpdate}/>  </Grid>
					)
					: <Grid item align="center"> "No images <span role='img' aria-label="">😥</span>" </Grid>}
			</Grid>

			<input type="file" id="select-image" accept="image/*" className={classes.input} onChange={handleImageChange}/>
			<label htmlFor="select-image" >
				{	images.data.length < 5 ?
						<Button color="primary" size="large" variant="contained" fullWidth  component="span" >Upload a new picture</Button> 
					: <></>}
			</label>
		</Paper>
	</>
	)
}

const Image = (props) => {
	const classes =  useStyles()

	const handleClickProfilePic = (event) => {
		updateProfilePic(()=>{},()=>{},props.image.user_id, props.image.id)
		props.update()

	}

	const handleClickDelete = (event) => {
		deleteImage(props.image.id, (res) => {},
		(err) => {})
		props.update()
	}

	return (
		<>
			<Paper variant="outlined" className={classes.imagecard}>
				<img src={props.image.url} alt="" className={classes.images}/>
				{ props.image.isProfilePic ? <Typography>Profile picture</Typography> : <></> }
					<ButtonGroup color="primary" fullWidth aria-label="outlined primary button group" className={classes.imagebtngr}>
						<Button onClick={handleClickProfilePic} disabled={props.image.isProfilePic} >Profile Picture</Button>
  						<Button onClick={handleClickDelete} disabled={props.image.isProfilePic} >Delete</Button>
					</ButtonGroup>
			</Paper>
		</>
	)
}

function useForceUpdate(){
	const [value, setValue] = useState(0); // integer state
	if (value > 0)
    return () => setValue(value => ++value); // update the state to force render
}

export default Images