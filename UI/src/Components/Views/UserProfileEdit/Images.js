import React, {useState, useEffect, useRef, useContext }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {getUserImages} from '../../../Services/images'
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
		margin: "1rem"
	},
	input: {
		display: "none"
	}
});

const Images = (props) => {
	const classes = useStyles()
	const [images, setImages] = useState({data: []})
	const [image, setImage] = useState({})
	const userId = props.user.data.id;
	const imageRef = useRef()

	imageRef.current = image;
	useEffect(() => {
		getUserImages(props.user.data.id, setImages, (err) => {console.log({err})})
	}, [props.user.data.id])

	const handleSendImage = () => {
			// const userId = cookieUserId()
			
				uploadImage(handleSuccess, handleError, userId, image )
				setImage(null)


	}
	const handleSuccess = (response) =>{
			console.log({response})
			// const userId = cookieUserId()
			// const userId = userData.data.id
			// updateProfilePic(handleCompleteProfile, err => console.log({err}) , userId, response.data.id)

	}
	const handleError = (error) => {
			console.log(error)
	}


	const handleImageChange = (event) => {
		let file = event.target.files[0]
		let reader = new FileReader();
		console.log(file);
		
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
		uploadImage(handleSuccess, handleError, userId, image )
		return () => {
			setImage({})
		}
	}, [userId, imageRef])

	return (
	<>
		<Paper elevation={2} className={classes.paper}>
			<Typography>Images</Typography>
			<Grid container >
				{ images.data.length
					? images.data.map( (image) => 
						<Grid item  xs={12} md={6} lg={4} key={image.id}> <Image image={image}/>  </Grid>
					)
					: <Grid item align="center"> "No images <span role='img' aria-label="">😥</span>" </Grid>}
			</Grid>

			<input type="file" id="select-image" accept="image/*" className={classes.input} onChange={handleImageChange}/>
			<label htmlFor="select-image" >
				{	images.data.length <= 2 ?
						<Button color="primary" size="large" variant="contained" fullWidth  component="span" >Upload a new picture</Button> 
					: <></>}
			</label>
		</Paper>
	</>
	)
}

const Image = ({image}) => {
	const classes =  useStyles()


	return (
		<>
			<Paper variant="outlined" className={classes.imagecard}>
				<img src={image.url} alt="" className={classes.images}/>
				<ButtonGroup color="primary" fullWidth aria-label="outlined primary button group" className={classes.imagebtngr}>
  					<Button>Profile Picture</Button>
  					<Button>Delete</Button>
				</ButtonGroup>
			</Paper>
		</>
	)
}

export default Images