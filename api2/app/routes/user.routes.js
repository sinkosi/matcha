/* NOTES FOR ROUTES
When a client sends requests for an endpoint using HTTP request i.e
(GET, POST, PUT, DELETE), we need to determine how the server will respond.
This is why we set up routhes.

These routes are:
	/users: GET, POST, DELETE
	/users/:userId:	GET, PUT, DELETE
*/

module.exports = app => {
	const users = require("../controllers/user.controller");

	//Create a new User
	app.post("/users", users.create);

	//Retrieve all Users
	app.get("/users", users.findAll);

	//Retrieve a single User with userId
	app.get("/users/:userId", users.findOne);

	//Update a User with userId
	app.put("/users/:userId", users.update);

	//Delete a User with userId
	app.delete("/users/:userId", users.delete);

	//Delete all Users
	app.delete("/users", users.deleteAll);
};