const sql = require("./db");

const Interests = function() {

    this.add = (userId, interest, callback) => {
        sql.query("INSERT INTO interests (hashtag, user_id) VALUES (?, ?)", [userId, interest], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            
            callback(null, res.insertId);
        });
    };


    this.findByUserId = (userId, callback) => {
        sql.query("SELECT * FROM interests WHERE user_id = ?", [userId], (err, res) => {
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

    // this.findUsersByInterest = (profileId, callback) => {
    //     sql.query("SELECT * FROM profile_likes WHERE profile_id = ?", [profileId], (err, res) => {
    //         if (err) {
    //             console.log("error: ", err);
    //             callback(err, null);
    //             return;
    //         }

    //         callback(null, res);
    //         return;
    //     });
    // };



    // this.removeOne = (likerId, profileId, callback) => {
    //     sql.query("DELETE FROM profile_likes WHERE liker_id = ? AND profile_id = ?", [likerId, profileId], (err, res) => {
    //         if (err) {
    //             console.log("error: ", err);
    //             callback(err, null);
    //             return;
    //         }

    //         callback(null, res);
    //         return;
    //     });
    // }
}

module.exports = Interests;