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
const Images = require("../models/images.model")
const Visits = require("../models/visits.model")
const Likes = require("../models/likes.model")
const Matches = require("../models/matches.model")
const bcrypt = require('bcrypt');
const { response } = require("express");


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
		let code = tring(14);

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
	if (!req.headers.loggedinuserid) {
		res.status(401).send({message:"you must be logged in"})
	}
	console.log(req.query)
	User.getAll(req.headers.loggedinuserid, (err, data) => {
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
	if (!req.headers.loggedinuserid) {
		res.status(401).send({message: "must be logged in"})
	}
	if (req.headers.loggedinuserid != req.params.userId){
		Visits.add(req.headers.loggedinuserid, req.params.userId, (err, result) => {})
	}
	let userId = req.params.userId
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
		} else {
			Interests.findByUserId(req.params.userId, (err, interests) => {
				if (err) console.log("error retrieving interests", err)
				else{
					let interestArray = [];

					interests.forEach(interest => {
						interestArray.push(interest.hashtag);
					});
					
					data.interests = interestArray;
					

					Images.findByUserId(req.params.userId, (err, images) => {
						if (err) console.log("error retrieving images", err);
						else {
							images.map(image => delete image.path);
							data.images = images
							if (req.headers.loggedinuserid == userId){
								res.send(data)
								return
							}

							Likes.doesUserLikeProfile(req.headers.loggedinuserid, userId, (err, like) => {
									if (err) console.log(err)
									else {
										data.isLiked = like;
										res.send(data)
										return 
									}
							})
						}
					})
				}
			})
		}
	});
};

//Update a single User with a userId in the request
exports.update = (req, res) => {
	//Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
		});
		return;
	}

	if (!req.headers.loggedinuserid){
		res.status(501).send({message: "must be logged in"})
		return;
	}
	let user = {};
	if (req.body.firstname) user.firstname = req.body.firstname;
	if (req.body.lastname) user.lastname = req.body.lastname;
	if (req.body.email) user.email = req.body.email;
	if (req.body.gender) user.gender = req.body.gender;
	if (req.body.biography) user.biography = req.body.biography;
	if (req.body.sexualPreference) user.sexual_preferences = req.body.sexualPreference;
	if (req.body.profilePic) user.profile_pic = req.body.profilePic;
	if (req.body.location) {/* some location stuff: user.location = req.body.location; */}
	if (req.body.password) {
		let data = req.body.password

		User.findLogin(data.username, data.password, (err, result) => {
			if (err) {
				console.log(err)
				if (err.kind === "not_found") {
					console.log("sending a not found response message")
					res.status(404).send({
						message: `404: Username not found with name: ${data.username}.`
					}); return;
				} else if (err.kind == "bad"){
					res.status(401).send({
						message: `401: Bad Credentials, unable to authenticate`
					})
					return
				}
				else if (err.kind == "valid"){
					res.status(303).send({
						message: `303: See other, Please use email to authenticate account`
					})
					return
				}
				else if (err.kind == 'invalid') {
					res.status(401)
					res.send({
						message: `401: Bad Credentials, unable to authenticate` })
					return
				} else {
					res.status(500).send({
						message: "500: Error retrieving User with username: " + data.username //TODO: Please finish the log in sequence here
					});
					return
				}
			} else {
				bcrypt.hash(data.newPassword, 10, (err, hash) => {
					if (err) {
						console.log("Bcrypt failure", err);
						res.status(500).send({message:"something went wrong. we apologize for the inconfinience"})
						return;
					} else {
						User.updateById(result.id, {password:hash}, (err, data) => {
							if (err){
								console.log(err)
								res.status(404).send({message: err || "failed to set new password"})
								return
							}
							
							res.status(201).send({message:"password was updated successfully"})
						});
					};
				});
			}
		})
	}
	if (req.body.interests) { 
		Interests.deleteAllUserInsterests(req.params.userId, (err, result) => {
			if (err) console.log(err)
			else {
				req.body.interests.forEach(interest => {
					Interests.add(req.params.userId, interest, (err, res) => {});
				})
			}
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

	console.log({user}, Object.keys(user).length);
	if (Object.keys(user).length > 0) {
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
						return;
					} else {
					res.status(500).send({
						message: "Error updating User with id " + req.params.userId
						});
						return;
					}
				}
				else {
					res.send(data);

					User.findById(req.params.userId, (err, result) => {
						if (err) console.log(err)

						console.log(result)
						if (result.sexual_preferences && result.profile_pic && result.biography){
							User.updateById(req.params.userId, {completed: true}, (err, result) => {})
						}
					})
					
				} 
				return;
			}
		);
	}
	else  if (!req.body.password )res.status(200).send({message:'empty body'});
}
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
	User.findLogin(req.body.login.value, req.body.password.value, (err, data) => {
		if (err) {
			console.log(err)
			if (err.kind === "not_found") {
				console.log("sending a not found response message")
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
			}
			else if (err.kind == 'invalid') {
				res.status(401).send({
					message: `401: Bad Credentials, unable to authenticate` })
			} else {
				res.status(500).send({
					message: "500: Error retrieving User with username: " + req.body.login["value"] //TODO: Please finish the log in sequence here
				});
			}
		} else {
			delete data.password;
			res.send(data);
		}
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

				bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
					if (err) {
						console.log("Bcrypt failure", err);
						result ({ kind: "bcrypt err"});
						return;
					} else {
						User.updateById(userId, {password:hash}, (err, data) => {
							if (err){
								console.log(err)
								res.status(404).send({message: err || "failed to set new password"})
								return
							}
							ActivationCode.removeByProfileId(userId, (err, data) => {});
							console.log(data)
							res.status(200).send({message:"password was updated successfully"})
						});
					};
				});
			});
		}
	})
}

exports.interactions = (req, res) => {
	let response = {}

	console.log("userId: ", req.params.userId)
	Visits.findByVisitorId(req.params.userId, (err, visits) => {
		if (err) console.log(err)
		else {
			
			response.profilesVisited = unique(visits);

			Visits.findByProfileId(req.params.userId, (err, visitors) => {
				if (err) res.status(501).send({message: "error fetching data"})

				else{
					response.visitors = unique(visitors);

					Likes.findByLikerId(req.params.userId, (err, profiles) => {
						if (err) res.status(501).send({message: "error fetching data"})

						else {
							response.profilesLiked = unique(profiles);

							Likes.findByProfileId(req.params.userId, (err, likes) => {
								if (err) cres.status(501).send({message: "error fetching data"})
								else {
									response.likes = unique(likes)

									Matches.findByUserId(req.params.userId, (err, matches) => {
										if (err) res.status(501).send({message: "error fetching data"})

										else {
											response.matches = unique(matches);

											res.status(200).send(response)
										}
									})
								}
							})
						}
					})
				}
			})
		}
	})
	//res.send({profilesVisited:[{id:1, username:"mosima"}], visitors: [{id:1, username:"mosima"}], profilesLiked:[{id:1, username:"mosima"}], likes:[{id:1, username:"mosima"}], matches:[{id:1, username:"mosima"}]})
}


function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}