import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import socketIOClient from "socket.io-client";
import { UserContext } from '../UserContext'
const ENDPOINT = "http://127.0.0.1:5000/chats";

// let messages = []

const useStyle = makeStyles({

	sideBar:{
		paddingTop: "4rem",
		backgroundColor: "#ddd",
		gridRowStart: 1,
		gridRowEnd:4,
		boxShadow: " -1px 0px 5px -1px rgba(100,100,100,1)"
	},
	user:{
		margin: "0.7rem",
		padding: "0.5rem",
		// marginRight: "0rem",
		cursor: "pointer",
		backgroundColor: "#fff9",
		display: "block"
	},
	activeUser:{
		margin: "0.7rem",
		padding: "0.5rem",
		paddingLeft: "1rem",
		marginRight: "-0.3rem",
		cursor: "pointer",
		backgroundColor: "#fafafa",
		display: "block"
	},
	container:{
		display: "grid",
		gridTemplateColumns: "140px auto",
		gridTemplateRows: "1fr 9fr 1fr",
		// backgroundColor: "black",
		height: "91vh"
	},
	chatWindow:{
		backgroundColor: "green",
		// width: "auto"
	},
	userName:{
		backgroundColor: "#eed",
		textAlign: "center",
		paddingTop: "1rem"
	},
	messagesWindow: {
		// backgroundColor: "orange",
		padding: "0.5rem"
	},
	alignRight:{
		textAlign:"right"
	},
	alignLeft:{
		textAlign: "left"
	},
	message:{
		display: "inline-block",
		margin: "0.3rem",
		position: "relative",
		marginLeft: "",
		boxShadow: " 2px 2px 3px -1px rgba(133,133,133,0.7)",
		padding: "0.4rem",
		width: "auto",
		backgroundColor:"#bcf"
	},
	newMessageWindow: {
		// backgroundColor: "blue",
		// height: "10vh",
		padding: "1rem"
	},
	sendButton:{
		width: "10rem"
	}
})
function Chat(props) {
	const classes = useStyle()
	const [messages, setMessages] = useState([]);
	const {userData} = useContext(UserContext);
	
	const appendMessage = (message) => {
		setMessages(messages.concat([message]))
	}

	useEffect(() => {
		const soc = socketIOClient(ENDPOINT, {query:{userId: userData.data.id}});
		soc.on("error", data => {
			console.log(data);
		});
		
		soc.on("message", (message) => {
			console.log(message)
			appendMessage(message)
		})
	}, [userData.data.id, appendMessage]);


	return (
		<>
			{/* It's <time dateTime={response}>{response}</time> */}
			{/* { messages.map(message => <div>{message.message}</div>) } */}
			<div className={classes.container} >
				<Users />

					<div className={classes.userName} ><Typography variant="h4" >Mosibudi</Typography></div>
					<Messages />
					<div className={classes.newMessageWindow} >
						<Grid container>
							<Grid item sx sm>
								<TextField fullWidth variant="outlined" size="small" />
							</Grid>
							<Grid item> 
								<Button variant="contained" size="large" color="primary" >send</Button> 
							</Grid>
						</Grid>
					</div>

			</div>
		</>
	);
}

const Users = (prop) => {
	const [users, setUsers] = useState({data:[{id:2, username:"mosima"}, {id:3, username:"mosibudi"}]})
	const classes = useStyle()
	const activeChat = 3
	const handleClickUser = (userId) => {
		console.log("clicked user ", userId)
	}
	return (
		<div className={classes.sideBar}>
					{users.data.map( (user) => 
						<div key={user.id} className={user.id===activeChat? classes.activeUser: classes.user} onClick={(e)=>handleClickUser(user.id)} id={user.id} ><Typography>{user.username}</Typography></div>
					)}
		</div>
		)
}


const Messages = (props) => {
	const classes = useStyle()
	const userId = 1;
	const messages = [{message:"hi", to:1, from:2, id:1},{message:"hello", to:2, from:1, id:2},{message:"how are you doing?", to:1, from:2, id:3},{message:"I am good thanx. how are you doing yourself?", to:2, from:1, id:4},{message:"Not bad", to:1, from:2, id:5}]
	return (
		<div className={classes.messagesWindow} >
			{messages.map( (message) =>
				<div  key={message.id} className={message.from === userId? classes.alignRight : classes.alignLeft} >
					<div className={classes.message}>
						<Typography>{message.message}</Typography>
					</div>
				</div>

			)}
		</div>
	)
}
export default Chat;
