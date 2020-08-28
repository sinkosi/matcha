const sql = require("./db");

/**
 * ? CONSTRUCTOR
 */

const Interests = function(interest) {
    this.hashtag = interest.hashtag;
    this.user_id = interest.user_id;
}

Interests.add = (userId, interest, result) => {
    sql.query("INSERT INTO interests (hashtag, user_id) VALUES (?, ?)", [userId, interest], 
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`Interest add for user with id: ${userId}`, res)
        result(null, res.insertId);
        });
    };


Interests.findByUserId = (userId, result) => {
    sql.query("SELECT * FROM interests WHERE user_id = ?", [userId], 
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`Found interests for user with ID: ${userId}`,  res);
        result(null, res[0]);
        return;
    });
};

//RETRIEVE ALL IMAGES (NO SORT)
Interests.getAllInterest = result => {
    sql.query("SELECT * FROM interests", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Interests: ", res);
        result(null, res);
        
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


module.exports = Interests;