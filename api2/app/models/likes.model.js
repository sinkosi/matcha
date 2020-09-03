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
    const sqlQuery =`SELECT profile_likes.profile_id as id, users.username
	            FROM profile_likes LEFT JOIN users ON users.id = profile_likes.profile_id 
                WHERE profile_likes.liker_id = ?`
    sql.query(sqlQuery, [likerId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
    });
};

Likes.findByProfileId = (profileId, result) => {
    const sqlQuery = `SELECT profile_likes.liker_id as id, users.username
	        FROM profile_likes LEFT JOIN users ON users.id = profile_likes.liker_id 
            WHERE profile_likes.profile_id = ?`
    sql.query(sqlQuery, [profileId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
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