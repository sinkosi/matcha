import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
// import socketIOClient from "socket.io-client";
import { getMatches } from "../../Services/chats";
import { MessagesContext } from "../MessagesContext";
import { UserContext } from '../UserContext'
// const ENDPOINT = "http://127.0.0.1:5000/chats";

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
		padding: "0.5rem",
		overflow: "auto"
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
	const [activeChat, setActiveChat] = useState(0)
	const [activeUsername, setActiveUsername] = useState("Select user to start chating")
	const {messages, setMessages} = useContext(MessagesContext);
	const [message, setMessage] = useState("");
	const {userData} = useContext(UserContext);
	
	const appendMessage = (message) => {
		console.log("append was called once")
		let msg = {...messages}
		// console.log("old messages: ", msg)
		if (message.from !== userData.data.id){	msg[message.from]? msg[message.from].push(message): msg[message.from] = [message] }
		else {	msg[message.to]? msg[message.to].push(message): msg[message.to] = [message] }
		// console.log("new messages: ", msg)

		setMessages(msg)
	}

		userData.chatSocket.off("message").on("message", (message) => {
			console.log("chatSocket says", message)
			appendMessage(message)
		})

	const sendMessage = () => {
		userData.chatSocket.emit("message", {message, from:userData.data.id, to:activeChat})
		appendMessage({message, from:userData.data.id, to:activeChat})
	}

	return (
		<>
			<div className={classes.container} >
				<Users activeChat={activeChat} setActiveChat={setActiveChat} setActiveUsername={setActiveUsername} />

					<div className={classes.userName} ><Typography variant="h4" >{activeUsername}</Typography></div>
					<Messages messages={messages[activeChat]} userId={userData.data.id} />
					<div className={classes.newMessageWindow} >
						<Grid container>
							<Grid item xs sm>
								<TextField fullWidth variant="outlined" size="small" value={message} onChange={(event) => setMessage(event.target.value)}/>
							</Grid>
							<Grid item> 
								<Button variant="contained" size="large" color="primary" onClick={sendMessage} >send</Button> 
							</Grid>
						</Grid>
					</div>

			</div>
		</>
	);
}

const Users = (props) => {
	const [users, setUsers] = useState({data:[]})
	const classes = useStyle()
	const activeChat = props.activeChat
	const handleClickUser = (userId) => {
		console.log("clicked user ", userId)
		props.setActiveChat(userId)
		props.setActiveUsername(selectUsername(users.data, userId))
	}

	useEffect(() => {
		getMatches(setUsers)

	},[])
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
	const userId = props.userId;
	const messages = props.messages
	return (
		
		<div className={classes.messagesWindow} >
			{ messages ?
				messages.map( (message, key) =>
					<div  key={key} className={message.from === userId? classes.alignRight : classes.alignLeft} >
						<div className={classes.message}>
							<Typography>{message.message}</Typography>
						</div>
					</div>	)
			  :	<Typography align="center" variant="h5" >Be the first to send a message</Typography>
			}
		</div>
	)
}

function selectUsername(users, userId){
	for (const user of users) {
		if (user.id === userId)
			return user.username
	}
}
export default Chat;
