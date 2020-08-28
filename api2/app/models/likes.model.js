const sql = require("./db");

const Likes = function(likes) {
    this.profileId = likes.profileId;
    this.likerId = likes.likerId;
}

Likes.addLike = (likerId, profileId, result) => {
    sql.query("INSERT INTO profile_likes (profile_id, liker_id) VALUES (?, ?)", [profileId, likerId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`Like has been added to user with id: ${profileId}`)
        result(null, res.insertId);
    });
};

Likes.findByLikerId = (likerId, result) => {
    sql.query("SELECT * FROM profile_likes WHERE liker_id = ?", [likerId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("inserted image: ",  res);
        result(null, res[0]);
    });
};

Likes.findByProfileId = (profileId, result) => {
    sql.query("SELECT * FROM profile_likes WHERE profile_id = ?", [profileId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`Found Profile with id: ${profileId}`);
        result(null, res);
    });
};


Likes.removeLike = (likerId, profileId, result) => {
    sql.query("DELETE FROM profile_likes WHERE liker_id = ? AND profile_id = ?", [likerId, profileId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted Like from user with id: ${profileId}`);
        result(null, res);
    });
}

module.exports = Likes;