const Likes = require("../models/likes.model");

//Create a new like
exports.likesCreate = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const likes = new Likes({
        likerId: req.body.likerId,
        profileId: req.body.profileId
    })

    //Save Like to database
    Likes.addLike(likerId, profileId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while adding image"
            });
        } else res.send({data});
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
exports.DeleteLike = (req, res) => {
    let likerId = req.params.likerId;
    let profileId = req.params.profileId;
    Likes.removeLike(likerId, profileId, (err, data) => {
        if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User Like with id ${likerId}.`
				});
			}else {
				res.status(500).send({
					message: `Could not delete User Like with id ${likerId}.`
				});
			}
		}else res.send({ message: `User Like was deleted successfully!`});
    })
}