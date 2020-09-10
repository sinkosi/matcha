const Location = require("../models/location.model");
const Users = require("../models/user.model");
const { response } = require("express");

exports.add = (req, res) => {
	console.log("_________body________\n", req.body)
	console.log("_____headers______\n", req.headers)

	if (!req.headers.loggedinuserid){
		res.status(401).send("Must be loggedIn")
		return
	}
	if (!req.body) {
		res.status(400).send({message:"request can not be empty"})
	}

	location = {
		city:req.body.location.city,
		state:req.body.location.region,
		code:req.body.location.postalCode,
		longitude:req.body.location.lng,
		latitude:req.body.location.lat,
		user_id:req.headers.loggedinuserid
	}
	console.log("location: ", location)
	Location.addOne(location, (err, locationId) => {
		if (err) {
			console.log(err)
			res.status(500).send({message:"error saving location"})
			return;
		}
		else {
			Users.updateById(location.user_id, {location:locationId}, (err, response) => {
				if (err) {
					console.log(err)
					res.status(500).send({message:"error saving location"})
					return;
				}
				else {
					res.send({message:"lacation data saved successfully"})
				}
			})
		}
	})
}