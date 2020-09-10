const Interests = require("../models/interests.model");

// CREATE A NEW INTEREST
exports.interestCreate = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const image = new Image({
        hashtag: req.body.hashtag,
        userID: req.body.user_id
    })

    //Save interest to database
    Interests.addOne(hashtag, userID, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while adding image"
            });
        } else res.send({data});
    })
}

//FIND AN INTEREST BY ITS ID
exports.findOneInterest = (req, res) => {
    let interestId = req.params.imageId;
    Interests.findById(interestId, (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Not found Interest with id ${interestId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Interest with id ${interestId}.`
                });
            };
        } else res.send(data);
    });
};

//RETRIEVE ALL INTERESTS (NO SORT)
exports.findAllInterests = (req, res) => {
    Interests.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "No interests retrieved"
            });
        } else res.send(data);
    });
}