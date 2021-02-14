const socket = require('socket.io');//(server, { origins: '*:*'});

module.exports = server => {
	const options = {}
	const io = socket(server, options);
	const online_users = {}

	io.on("connection", function (socket) {
		console.log("Socket is operational");
	});

	const chats = io.of("/chats");

	chats.use((socket, next) => {
		// console.log(socket)
		if (!socket.handshake.query.userId){
			console.log("denying connection...")
			next( new Error("must be logged in to connect to chats") )
		}
		else{
			/*****
			 * Stuff that happens on a connection requests
			 */
			online_users[socket.handshake.query.userId] = socket.id
			console.log("accepting connetion to chats...")
			next()
		}
	})

	chats.on("connection", (socket) => {
		socket.on("disconnecting", (reason) => {

			delete online_users[ getKeyByValue(online_users, socket.id) ]
			console.log("disconneting user: ", socket.client.id)
			console.log(online_users)
		})
		console.log("connection.....")

		console.log(online_users)

		socket.on("message", (message) => {
			console.log(message)

			sendMessage(message, message.to)
		})
		
	})

	const sendMessage = (message, to) => {
		if (online_users[to]){

			chats.to(online_users[to]).emit("message", message)
		}
	}


}
function getKeyByValue(object, value) { 
    return Object.keys(object).find(key => object[key] === value); 
} 