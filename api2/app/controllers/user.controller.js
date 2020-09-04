/*
ROUTES ARE MANAGED BY CONTROLLERS:
If you look inside routes you will see that there are calls such as
the retrieval of users but these matters are held by a controller
to prevent the API from being publicly exploitable.

HTTP STATUS CODES - FOR RESTFUL APIs (it is important)

1xx	-	INFORMATION	:	Transfer protocol level information
2xx	-	SUCCESS		:	Indicates that the client's request was accepted successfully
3xx	-	REDIRECTION	:	Indicates that the client must take additional action in order to complete the request
4xx	-	CLIENT ERROR:	Error status codes points the finger at the client
5xx	-	SERVER ERROR:	The server takes responsibility for these error status codes

201	-	CREATED		:	Resource has been created inside a collection
202	-	ACCEPTED	:	Indicates that request has been accepted but processing is not complete
204	-	NO CONTENT	:	Response to a PUT, POST, Delete request if API decline to send back a status message

301	-	MOVED (PERM):	The API has been redesigned and a new URI has been assigned to the client's requested resource.
302	-	FOUND		:	This is a way of telling the browser to redirect by making the same request to a different URI
303	-	SEE OTHER	:	
304	-	NOT MODIFIED:	Similar to 204 but when there is no body
307	-	TEMP REDIRECT:	Indicates API is not going to process the client's request

400	-	BAD REQUEST	:	Generic client-side error
401	-	Unauthorized:	Caused by a failure to authenticate
403	-	Forbidden	:	Indicates a client's request is formed correctly but the REST API refuses to honour it.
404	-	Not Found	:	The API can't map the client's URI to a resource but may be available in the future.
405	-	Method NotAllowed	:	Client used an HTTP method the resource does not allow.
406	-	Not Acceptable	:	

500	-	Internal Server Error:	There is an exception that caused an error
501	-	Not Implemented	:	Server does not recognise the request method

*/
const User = require("../models/user.model");
const ActivationCode = require("../models/activation.model")
const email = require("../config/email.config");
const Interests = require("../models/interests.model");


//Create and Save a new User
exports.create = (req, res) => {
	//Validate request
	if (!req.body)	{
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	//Create a User
	const user = new User({
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
	});

	//Save User in the database
	User.create(user, (err, userdata) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the User."
			});
		
		console.log("creating activation code:");
		let userId  = userdata.id
		let code = randomString(14);

		const activation = new ActivationCode({userId, code})
		ActivationCode.create(activation, (err, data) => {
			if (err)
				res.status(500).send({
					message:
						err.message || "Some error occurred while creating the User."
				});


			email.activationEmail(userdata.email, userId, code);
			res.send(userdata);
		});
	});
};

//Retrieve all Users from the database.
exports.findAll = (req, res) => {
	User.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occured while retrieving users."
			});
		else res.send(data);
	});
};

//Retrieve a single User with a userId in the request
exports.findOne = (req, res) => {
	User.findById(req.params.userId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.userId}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving User with id " + req.params.userId
				});
			}
		} else res.send(data);			
	});
};

//Update a single User with a userId in the request
exports.update = (req, res) => {
	//Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
		});
	}
	//console.log(req.body)
	let user = {};
	if (req.body.firstname) user.firstname = req.body.firstname;
	if (req.body.lastname) user.lastname = req.body.lastname;
	if (req.body.password) {/* some bcrypt stuff: user.password = req.body.password; */}
	if (req.body.gender) user.gender = req.body.gender;
	if (req.body.biography) user.biography = req.body.biography;
	if (req.body.sexualPreference) user.sexual_preferences = req.body.sexualPreference;
	if (req.body.profilePic) user.profile_pic = req.body.profilePic;
	if (req.body.location) {/* some location stuff: user.location = req.body.location; */}
	if (req.body.interests) { 
		req.body.interests.forEach(interest => {
			Interests.add(req.params.userId, interest, (err, res) => {});
		})
	}
	if (req.body.dob) {/* some interesting stuff: user.firstname = req.body.firstname; */}

	console.log({user})
	console.log(user.length)
	console.log(req.params.userId)
	console.log(user[0])
	console.log(req.body)
	//if (user.length > 0) {
	if (req.body) {
		User.updateById(
			
			req.params.userId,
			//user,
			req.body,
			(err, data) => {
				console.log('Run it')
				if (err) {
					if (err.kind === "not_found") {
						res.status(404).send({
							message: `Not found User with id ${req.params.userId}.`
						});
					} else {
					res.status(500).send({
						message: "Error updating User with id " + req.params.userId
						});
					}
				} else res.send(data);
			}
		);
	}
	else res.status(200).send({message:'empty body'});
};

//Delete a User with the specified userId in the request
exports.delete = (req, res) => {
	User.remove(req.params.userId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.userId}.`
				});
			}else {
				res.status(500).send({
					message: "Could not delete User with id " + req.params.userId
				});
			}
		}else res.send({ message: `User was deleted successfully!`});
	});
};

//Delete all Users from the Database
exports.deleteAll = (req, res) => {
	User.removeAll((err,data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Some error occured while removing all users."
			});
		}else res.send({ message: "All Users were deleted successfully!" });
	});
};

//LOGIN HANDLER

exports.login = (req, res) => {
	User.findLogin(req.body.login, req.body.password, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `404: Username not found with name: ${req.body.login.value}.`
				});
			} else if (err.kind == "bad"){
				res.status(401).send({
					message: `401: Bad Credentials, unable to authenticate`
				})
			}
			else if (err.kind == "valid"){
				res.status(303).send({
					message: `303: See other, Please use email to authenticate account`
				})
			} else {
				res.status(500).send({
					message: "500: Error retrieving User with username: " + req.body.login["value"] //TODO: Please finish the log in sequence here
				});
			}
		} else res.send(data);
	});
};

//SIGN UP WITH ENCRYPTION

//Create and Save a new User
exports.signup = (req, res) => {
	//Validate request
	if (!req.body)	{
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	// username min length 3
	if (!req.body.username || req.body.username.length < 3) {
		return res.status(400).send({
			msg: 'Please enter a username with min. 3 chars'
		});
	}

	// password min 6 chars
	if (!req.body.password || req.body.password.length < 8) {
		return res.status(400).send({
			msg: 'Please enter a password with min. 8 chars'
		});
	}
	

	//Create a User
	const user = new User({
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password
	});

	//Save User in the database
	User.signup(user, (err, data) => {
		if (err) {
			if (err.kind === "inUse") {
				res.status(409).send({
					message: `409: Username already in use`
				});
			} else if (err.kind === "bcrypt err") {
				res.status(403).send({
					message: `Unknown Bcrypt failure`
				});
			}
			else {
				res.status(500).send({
					message:
						err.message || "Some error occurred while creating the User."
				});
			}
		}
		else {
			let userId = data.id;
			let code = randomString(25);

			const activation = new ActivationCode({userId, code})
			ActivationCode.create(activation, (err, data) => {});
			email.activationEmail(data.email, userId, code);
			res.send(data);
		} 
	});
};

exports.activate = (req, res) => {
	//Validate Request
	User.updateByIdCode(req.params.userId, req.params.activationKey, (err, data) => {
		if (err) {
			console.log(`userID: ${req.params.userId} + KEY: ${req.params.activationKey}`)
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `This key is invalid, please use the link in your email to activate your account!`
				});
				return;
			} else if (err.kind === "db") {
				res.status(404).send({
					message: `Unable to update Database at this moment`
				});
				return;
			} else {
				res.status(500).send({
					message: `Error retrieving User with id ${req.params.userId} or key ${req.params.activationKey}.`
				});
				return;
			}
			return;
		}
		else{
			res.status(200).send(data);
		}			
	});
};

exports.forgotPasswordEmail = (req, res) => {
	let code = randomString(6);
	
	User.findByEmail(req.body.email, (err, data) => {
		if (err)
			res.status(404).send({message: 'something went wrong'})
		else {
			let userId = data.id;

			console.log({userId});
			let opt = new ActivationCode({userId, code});
			ActivationCode.create(opt, (err, data) => {});

			email.passwordResetEmail(req.body.email, code);
			res.status(200).send({message: "otp sent"})
		}
	})
	console.log(req.body);
}

exports.forgotPasswordOTP = (req, res) => {
	console.log(req.body);
	User.findByEmail(req.body.email, (err, data) => {
		if (err)
			res.status(404).send({message: 'something went wrong'})
		else {
			let userId = data.id;

			console.log({userId});

			ActivationCode.findByProfileId(userId, (err, data) => {
				if (err){
					res.status(404).send({message: "Wrong OPT. Please use the OPT from your email"});
					return
				}
				
				console.log({data});
				console.log(data.code);
				console.log(req.body.otp);
				if (data.code != req.body.otp){
					res.status(404).send({message: "Wrong OPT. Please use the OPT from your email"});
					return;
				}
				
				res.status(200).send({message:"otp accepted"})
			});
		}
	})
}

exports.forgotPasswordNewPassword = (req, res) => {
	console.log(req.body);
	User.findByEmail(req.body.email, (err, data) => {
		if (err)
			res.status(404).send({message: 'something went wrong'})
		else {
			let userId = data.id;

			ActivationCode.findByProfileId(userId, (err, data) => {
				if (err){
					res.status(404).send({message: "Wrong OPT. Please use the OPT from your email"});
					return
				}
				if (data.code != req.body.otp){
					res.status(404).send({message: "Wrong OPT. Please use the OPT from your email"});
					return;
				}
				User.updateById(userId, {password:req.body.newPassword}, (err, data) => {
					if (err){
						console.log(err)
						res.status(404).send({message: err || "failed to set new password"})
						return
					}
					ActivationCode.removeByProfileId(userId, (err, data) => {});
					console.log(data)
					res.status(200).send({message:"password was updated successfully"})
				})
			});
		}
	})
}


function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }