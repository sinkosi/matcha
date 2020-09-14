import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { getCookie } from './utils/cookies'
import socketIOClient from "socket.io-client";


let cookieToken = getCookie('token')
let loginData = getCookie('loginData');

let userData = {}
userData.loggedIn = cookieToken ? true : false
userData.token = userData.loggedIn ? cookieToken : undefined

if (loginData) {
	loginData = JSON.parse(loginData);
	userData = loginData;
	if (userData.loggedIn){
		const soc = socketIOClient("http://127.0.0.1:5000/chats", {query:{userId: loginData.data.id}});
		soc.on("error", data => {
			console.log(data);
		});

		userData.chatSocket = soc;
	}
}

ReactDOM.render(
	<React.StrictMode>

		<App userData={userData} />
	</React.StrictMode>,
	document.getElementById('root')
);

