const sql = require("./db");

const Likes = function() {

    this.add = (likerId, profileId, callback) => {
        sql.query("INSERT INTO profile_likes (profile_id, liker_id) VALUES (?, ?)", [profileId, likerId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            
            callback(null, res.insertId);
        });
    };


    this.findByLikerId = (likerId, callback) => {
        sql.query("SELECT * FROM profile_likes WHERE liker_id = ?", [likerId], (err, res) => {
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

    this.findByProfileId = (profileId, callback) => {
        sql.query("SELECT * FROM profile_likes WHERE profile_id = ?", [profileId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            callback(null, res);
            return;
        });
    };



    this.removeOne = (likerId, profileId, callback) => {
        sql.query("DELETE FROM profile_likes WHERE liker_id = ? AND profile_id = ?", [likerId, profileId], (err, res) => {
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

module.exports = Likes;