// const  = require("../models/images.model");

exports.add = (req, res) => {
	console.log("_________body________\n", req.body)
	console.log("_____headers______\n", req.headers)
	res.send({message: "I got your secret message"})
}