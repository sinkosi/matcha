// Script to setup MySQL DB
//require("./app/config/db.setup");

// modules ======================================
const express = require('express');
const socket = require('socket.io');//(server, { origins: '*:*'});
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();

var corsOptions = {
	origin: "*"//"http://localhost:3000"
  };
  
app.use(cors(corsOptions));
  //app.use(cors());

//set the port: This is where that whole localhost:3000 thing gets done and should be changed if
// you have a port conflict etc. If it works then you will see the text below.
const port = 5000;

// parse requests of content-type: application/json:
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
// app.use(bodyParser.json());

//parse requests of content-type:application/x-www-form-urlencoded:
app.use(bodyParser.urlencoded({ extended: true }));

//	Simple Route
app.get('/', (req, res) => {
	res.json({message: 'Welcome to Matcha Backend!',
						id: "1",
						name: "Test"
	});
});

// ! STATIC FILES
app.use('/static',express.static('uploads'))

/*Defining The Route
What is a route, this works like the href in a standard issue MAMP stack. With Node, we use APIs from
Express.js and that will be our routes manager
*/
// const router = require('./app/routes/router.js');
// app.use('/api', router);


//THE ROUTES need to be invoked here to ensure that the app is listening for route changes
require("./app/routes/user.routes")(app);
require("./app/routes/images.routes")(app);
require("./app/routes/interest.routes")(app);
require("./app/routes/likes.routes")(app);
require("./app/routes/blocked.routes")(app);
require("./app/routes/matches.routes")(app);

//require("./app/routes/chat.routes")(app);

/*startup app at http://localhost:3000
the text below should be visible if the server is running but if it is not then error messages
will be printed.
The port for listening for requests is set here
*/
const server = app.listen(port, function() {
	console.log(`Matcha has started running/listening on port ${port}!`);
	console.log(`http://localhost:${port}`);
});

// /**
//  * ! SOCKET IO
//  */
// const io = socket(server);

// io.on("connection", function (socket) {
// 	console.log("Socket is operational");
// });

require("./app/socketServer")(server)