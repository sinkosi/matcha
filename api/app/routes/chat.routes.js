/* NOTES FOR ROUTES
When a client sends requests for an endpoint using HTTP request i.e
(GET, POST, PUT, DELETE), we need to determine how the server will respond.
This is why we set up routhes.

These routes are:
	/users: GET, POST, DELETE
	/users/:userId:	GET, PUT, DELETE
*

module.exports = app => {
    app.get("/chat/:userId", message.findAll);
}
*/