import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Input  } from '@material-ui/core';
import { uploadImage, updateProfilePic} from '../../../Services/profile'
// import { cookieUserId } from '../../../utils/cookies'





const useStyles = makeStyles({
    root: {
        marginTop: '3rem',
        padding: '2rem'
        
      },
    checkboxFormControl: {
    display: 'block'
    
    },
  });


export default function ProfilePicture(props)
{
    const classes = useStyles()
    const [image, setImage] = useState()
    const {userData, setUserData} = useContext(UserContext)
    const history = useHistory()

    if (userData.completed)
      history.push('/')

    const handleSendProfilePic = () => {
        // const userId = cookieUserId()
        const userId = userData.data.id
        uploadImage(handleSuccess, handleError, userId, image )
    }
    const handleSuccess = (response) =>{
        console.log({response})
        // const userId = cookieUserId()
        const userId = userData.data.id
        updateProfilePic(handleCompleteProfile, err => console.log({err}) , userId, response.data.image_id)
   
    }
    const handleError = (error) => {
        console.log(error)
    }

    const handleCompleteProfile = (response) => {
      console.log(response)
        if (response.data.completed){
          let userDataTemp = userData
          userDataTemp.completed = true
          setUserData(userDataTemp)
          
          props.next()
        }
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


    return (
        <Paper elevation={5} className={classes.root}>
            <Typography variant={"h1"} align={"center"}>Profile Picture </Typography> 
            <Typography variant={"h5"} align={"center"}>
                Please upload a profile picture
            </Typography>

            <Input type="file"  onChange={handleImageChange}/>
            <Button color="primary" size="large" variant="contained" fullWidth onClick={ ()=>{ console.log(image)}} >Select a picture</Button>

            <Button color={"primary"} size={"large"} variant={"contained"} onClick={handleSendProfilePic}  >Upload</Button>
        </Paper  >
    );
}