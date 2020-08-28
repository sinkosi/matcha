
const Image = require("../models/images.model");

//Create and Save a new User
/*
const ImagesModel = require("../models/images.model");

exports.getAll = (req, res) => {
    console.log("images.fetchone reaches");

    ImagesModel.getAll((error, data) => {
        if (error){
            console.error(error);
            res.status(501).send({message: "something went wrong"});
        }

        res.status(200).send(data);
    })
}
*/

// //Retrieve all Users from the database.
// exports.findAll = (req, res) => {
// 	User.getAll((err, data) => {
// 		if (err)
// 			res.status(500).send({
// 				message:
// 					err.message || "Some error occured while retrieving users."
// 			});
// 		else res.send(data);
// 	});
// };

// //Retrieve a single User with a userId in the request
// exports.findOne = (req, res) => {
// 	User.findById(req.params.userId, (err, data) => {
// 		if (err) {
// 			if (err.kind === "not_found") {
// 				res.status(404).send({
// 					message: `Not found User with id ${req.params.userId}.`
// 				});
// 			} else {
// 				res.status(500).send({
// 					message: "Error retrieving User with id " + req.params.userId
// 				});
// 			}
// 		} else res.send(data);			
// 	});
// };

// exports.findUsername = (req, res => {
// 	User.findUsername(req.params.username, (err, data) => {
// 		if (err) {
// 			if (err.kind === "not_found") {
// 				res.status(404).send({
// 					message: `Username not found with name: ${req.params.username}.`
// 				});
// 			} else {
// 				res.status(500).send({
// 					message: "" //Please finish the log in sequence here
// 				})
// 			}
// 		}
// 	})
// })

// //Update a single User with a userId in the request
// exports.update = (req, res) => {
// 	//Validate Request
// 	if (!req.body) {
// 		res.status(400).send({
// 			message: "Content can not be empty"
// 		});
// 	}

// 	User.updateById(
// 		req.params.userId,
// 		new User(req.body),
// 		(err, data) => {
// 			if (err) {
// 				if (err.kind === "not_found") {
// 					res.status(404).send({
// 						message: `Not found User with id ${req.params.userId}.`
// 					});
// 				} else {
// 				res.status(500).send({
// 					message: "Error updating User with id " + req.params.userId
// 					});
// 				}
// 			} else res.send(data);
// 		}
// 	);
// };

// //Delete a User with the specified userId in the request
// exports.delete = (req, res) => {
// 	User.remove(req.params.userId, (err, data) => {
// 		if (err) {
// 			if (err.kind === "not_found") {
// 				res.status(404).send({
// 					message: `Not found User with id ${req.params.userId}.`
// 				});
// 			}else {
// 				res.status(500).send({
// 					message: "Could not delete User with id " + req.params.userId
// 				});
// 			}
// 		}else res.send({ message: `User was deleted successfully!`});
// 	});
// };

// //Delete all Users from the Database
// exports.deleteAll = (req, res) => {
// 	User.removeAll((err,data) => {
// 		if (err) {
// 			res.status(500).send({
// 				message: err.message || "Some error occured while removing all users."
// 			});
// 		}else res.send({ message: "All Users were deleted successfully!" });
// 	});
// };
exports.imgCreate = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const image = new Image({
        imageUrl: req.body.imageurl,
        userID: req.body.user_id/*,
        uploaded = image.uploaded*/
    })
    //Save image to database
    Image.addOne(imageUrl, userID, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while adding image"
            });
        } else res.send({data});
    })
}

//FIND AN IMAGE BY ITS ID
exports.findOneImg = (req, res) => {
    let imageId = req.params.imageId;
    Image.findById(imageId, (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Not found Img with id ${imageId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Image with id ${imageId}.`
                });
            };
        } else res.send(data);
    });
};

//USER ID USED TO RETRIEVE ALL USERS PICS
exports.findImgbyUserId = (req, res) => {
    let userId = req.params.imageId;
    Image.findByUserId(userId, (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Not found Img with id ${userId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Image with id ${userId}.`
                });
            };
        } else res.send(data);
    });
}

//RETRIEVE ALL IMAGES (NO SORT)
exports.findAllImg = (req, res) => {
    Image.getAllImg((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "No images retrieved"
            });
        } else res.send(data);
    });
}

//DELETE AN IMAGE
exports.deleteOneImage = (req, res) => {
    let imageId = req.params.imageId;
    Image.removeOne(imageId, (err, data) => {
        if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User Image with id ${imageId}.`
				});
			}else {
				res.status(500).send({
					message: `Could not delete User Image with id ${imageId}.`
				});
			}
		}else res.send({ message: `User Image was deleted successfully!`});    
    });
}
