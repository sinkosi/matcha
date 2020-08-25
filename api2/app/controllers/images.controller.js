
const User = require("../models/user.model");

//Create and Save a new User

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