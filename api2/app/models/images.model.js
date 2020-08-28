const sql = require("./db");

//Constructor
const Images = function(image) {
    this.url = image.url;
    this.user_id = image.user_id;
    this.uploaded = image.uploaded;
}

//Add a new image
image.addOne = (imageUrl, userID, result) => {
    sql.query("INSERT INTO images (url, user_id) VALUES (?, ?)", [imageUrl, userID], 
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
image.findById = (imageId, result) => {
    sql.query("SELECT * FROM images WHERE id = ?", [imageId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("inserted image: ",  res);
        result(null, res[0]);
        return;
    });
};

//USER ID USED TO RETRIEVE ALL USERS PICS
image.findByUserId = (userId, result) => {
    sql.query("SELECT * FROM images WHERE user_id = ?", [userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
        return;
    });
};

//RETRIEVE ALL IMAGES (NO SORT)
image.getAll = (result) => {
    sql.query("SELECT * FROM images", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
        return;
    });
};

//DELETE AN IMAGE
image.removeOne = (imageId, result) => {
    sql.query("DELETE FROM images WHERE id = ?", [imageId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
        return;
    });
}

module.exports = new Images();