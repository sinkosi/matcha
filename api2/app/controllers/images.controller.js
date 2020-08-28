
const Image = require("../models/images.model");



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

exports.upload = (req, res) => {
    console.log(req.body)
}
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
