const sql = require("./db");

//Constructor
const Image = function(image) {
	this.url = image.url;
	this.user_id = image.user_id;
	//this.uploaded = image.uploaded;
}

//Add a new image
Image.addOne = (imageUrl, imagePath, userID, result) => {
	sql.query("INSERT INTO images (url, path, user_id) VALUES (?, ?, ?)", [imageUrl, imagePath, userID], 
	(err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("inserted image: ",  res);
		result(null, res.insertId);
		// sql.end();
	});
};

//FIND AN IMAGE BY ITS ID
Image.findById = (imageId, result) => {
	sql.query("SELECT * FROM images WHERE id = ?", [imageId], (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("inserted image: ",  res);
		result(null, res[0]);
		
	});
};

//USER ID USED TO RETRIEVE ALL USERS PICS
Image.findByUserId = (userId, result) => {
	sql.query("SELECT * FROM images WHERE user_id = ?", [userId], (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		
		}
		console.log("Images have been retrieved: ", res);
		result(null, res);
		
	});
};

Image.userProfilePic = (userId, result) => {
	sql.query("SELECT profile_pic FROM users WHERE id = ?", [userId], (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		
		}
		result(null, res[0].profile_pic);
	})
}

//RETRIEVE ALL IMAGES (NO SORT)
Image.getAllImg = result => {
	sql.query("SELECT * FROM images", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		console.log("Images: ", res);
		result(null, res);
		
	});
};

//DELETE AN IMAGE
Image.removeOne = (imageId, result) => {
	sql.query("DELETE FROM images WHERE id = ?", [imageId], (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		console.log("Image deleted: ", res);
		result(null, res);
	
	});
}

module.exports = Image;