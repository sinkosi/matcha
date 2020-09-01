
const Image = require("../models/images.model");
const fs = require("fs");



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
    userId = req.params.userId;
    let imgdir = './uploads/images/'+userId;
    fs.mkdir(imgdir, (err) => {});
    let fileExtention = req.body.name.split('.');
    fileExtention = fileExtention[fileExtention.length - 1];
    
    let name = randomString(20)+'.'+fileExtention;
    let path = imgdir+'/'+name;
    let url = 'http://localhost:5000/static/images/'+userId+'/'+name;
    fs.writeFile(path, req.body.data, {encoding:'base64'}, (err, data) => {
        if (err) {
            res.status(501).send({message:"error saving image"})
            return;
        }

        Image.addOne(url,path, userId,(err, result) => {
            if (err) console.log(err)

            else res.status(201).send({id:result, message:"image uploaded successfully"})
        })
    })

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


function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }