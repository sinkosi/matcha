import React from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup  } from '@material-ui/core';




const useStyles = makeStyles({
    root: {
        marginTop: '3rem',
        padding: '2rem'
        
      },
    checkboxFormControl: {
    display: 'block'
    
    },
  });


//   function Camera(){
//     return (
//         <h1>Camera stuff here</h1>
//     )
// }
// function Upload(){
//     return (
//         <h1>Upload stuff here</h1>
//     )
// }
// function Link(){
//     return (
//         <h1>Link stuff here</h1>
//     )
// }
export default function ProfilePicture(props)
{
    const classes = useStyles();
    // const [mode, setMode] = React.useState("camera");
    
    
    
    // const handleSetModeCamera = () => setMode("camera");
    // const handleSetModeUpload = () => setMode("upload");
    // const handleSetModeLink = () => setMode("link");

    // const modeToRender = () => {
    //     if (mode === "camera")
    //         return <Camera />;
    //     else if (mode === "upload")
    //         return <Upload />;
    //     else if (mode === "Link")
    //         return <Link />;
    //     else
    //         return <Fragment />
    // }
    return (
        <Paper elevation={5} className={classes.root}>
            <Typography variant={"h1"} align={"center"}>Profile Picture </Typography> 
            <Typography variant={"h5"} align={"center"}>
                Please choose a profile picture
            </Typography>

            {/* <Camera /> */}

            <ButtonGroup color="primary" variant="contained" fullWidth aria-label="outlined primary button group">
                <Button
                    id="camera"
                    // onClick={handleSetModeCamera}
                    className="camerabutton"
                >
                    Open Camera
                </Button>
                <Button
                 id="upload"
                //  onClick={handleSetModeUpload}
                >
                    Upload a picture
                </Button>
                <Button
                    id="link"
                    // onClick={handleSetModeLink}
                >
                    paste a link
                </Button>
            </ButtonGroup>

           
            
            
            
            
               
            
         
            <Button color={"primary"} size={"large"} variant={"contained"} onClick={props.next}>Next ></Button>
        </Paper  >
    );
}