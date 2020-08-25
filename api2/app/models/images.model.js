const sql = require("./db");

//Constructor
const Images = function() {
    // this.sql = sql;

    this.addOne = (imageUrl, userID, callback) => {
        sql.query("INSERT INTO images (url, user_id) VALUES (?, ?)", [imageUrl, userID], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            console.log("inserted image: ",  res);
            callback(null, res.insertId);
            // sql.end();
        });
    };


    this.findById = (imageId, callback) => {
        sql.query("SELECT * FROM images WHERE id = ?", [imageId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            console.log("inserted image: ",  res);
            callback(null, res[0]);
            return;
        });
    };

    this.findByUserId = (userId, callback) => {
        sql.query("SELECT * FROM images WHERE user_id = ?", [userId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            callback(null, res);
            return;
        });
    };

    this.removeOne = (imageId, callback) => {
        sql.query("DELETE FROM images WHERE id = ?", [imageId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            callback(null, res);
            return;
        });
    }
}

module.exports = Images;