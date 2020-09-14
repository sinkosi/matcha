const Matches = require("../models/matches.model");
const Match = require("../models/matches.model");

//Create a new match
exports.matchCreate = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const match = new Matches({
        firstUserId: req.body.likerId,
        secondUserId: req.body.profileId
    })

    Match.add(firstUserId, secondUserId, (err, res) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while adding image"
            });
        } else res.send({data});
    })
}

exports.get = (req, res) => {
    if (!req.headers.loggedinuserid){
		res.status(401).send("Must be loggedIn")
		return
    }
    
    Matches.findByUserId(req.headers.loggedinuserid, (err, results) => {
        if (err) {
            console.log(err)
            res.status(501).send({message:"error fetching matches"})
            return
        }
        else {
            console.log("responding with a list of matches: ", results)
            res.send(results)
        }
    })
}
//Find match by ID
//Matches.findById(matchId,

//Matches.findByUserId

//Matches.removeOne