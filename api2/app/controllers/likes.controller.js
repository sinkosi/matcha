const Likes = require("../models/likes.model");
const Matches = require("../models/matches.model");


//Create a new like
exports.add = (req, res) => {

	if (!req.headers.loggedinuserid) {
		res.status(401).send({message: "must be logged in"})
	}

	likerId = req.headers.loggedinuserid,
	profileId = req.params.userId
	

	//Save Like to database
	Likes.addLike(likerId, profileId, (err, data) => {
		if (err) {
			console.log(err)
			res.status(500).send({
				message: err.message || "Some error occurred while adding image"
			});
			return
		} else {
			///Check to see if you also like you so that its a match
			Likes.doesUserLikeProfile(profileId, likerId, (err, result) => {
				if (err) console.log(err)

				else {
					if (result) Matches.add(likerId, profileId, ()=>{})
				}
				res.send({data});
			})
		}
	})    
}

//FIND A LIKE BY ITS LikerID
exports.findByLikerId = (req, res) => {
	let likerId = req.params.likerId;
	Likes.findByLikerId(likerId, (err, data) => {
		if (err) {
			if (err.kind === "not found") {
				res.status(404).send({
					message: `Not found Interest with id ${likerId}.`
				});
			} else {
				res.status(500).send({
					message: `Error retrieving Interest with id ${likerId}.`
				});
			};
		} else res.send(data);
	});
};

//FIND AN INTEREST BY ITS ID
exports.findByProfileId = (req, res) => {
	let profileId = req.params.profileId;
	Likes.findByProfileId(profileId, (err, data) => {
		if (err) {
			if (err.kind === "not found") {
				res.status(404).send({
					message: `Not found Interest with id ${profileId}.`
				});
			} else {
				res.status(500).send({
					message: `Error retrieving Interest with id ${profileId}.`
				});
			};
		} else res.send(data);
	});
};

//Remove a Like
exports.remove = (req, res) => {
	if (!req.headers.loggedinuserid) {
		res.status(401).send({message:"must be logged in"})
		return
	}
	console.log(req.headers)
	let likerId = req.headers.loggedinuserid;
	let profileId = req.params.userId;
	Likes.removeLike(likerId, profileId, (err, data) => {
		if (err) {
			console.log(err)
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User Like with id ${likerId}.`
				});
				return;
			}else {
				res.status(500).send({
					message: `Could not delete User Like with id ${likerId}.`
				});
				return
			}
		}else {
			//remove match if it exist
			Matches.exist(likerId, profileId, (err, result) => {
				Matches.removeOne(result.id, ()=>{})
			})
			res.send({ message: `User Like was deleted successfully!`});
			return
		}
	})
}