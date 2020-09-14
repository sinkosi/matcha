const Blocked = require("../models/blocked.model");
const Likes =  require("../models/likes.model")
const Matches = require("../models/matches.model");


//Create a new like
exports.add = (req, res) => {

	if (!req.headers.loggedinuserid) {
		res.status(401).send({message: "must be logged in"})
	}

	blockerId = req.headers.loggedinuserid,
	blockedId = req.params.userId
	
	
	Blocked.add(blockerId, blockedId, (err, result) => {
		if (err) {
			console.log(err)
			res.status(500).send({
				message: err.message || "error blocking a user"
			});
			return
		}
		res.send({message:"User was blocked succefully"})

		Matches.exist(blockerId, blockedId, (err, result) => {
			Matches.removeOne(result.id, ()=>{})
		})

		Likes.removeLike(blockerId, blockedId, () => {})

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
		res.status(401).send({message: "must be logged in"})
	}

	blockerId = req.headers.loggedinuserid,
	blockedId = req.params.userId


	Blocked.remove(blockerId, blockedId, (err, result) => {
		if (err){
			console.log(err)
			res.status(500).send({
				message: err.message || "error unblocking a user"
			});
			return
		}

		res.send({message:"user unblocked successfully"})
	})
}