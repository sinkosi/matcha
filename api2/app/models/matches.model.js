const sql = require("./db");

//Constructor
const Matches = function(match) {
    this.firstUserId = match.firstUserId;
    this.secondUserId = match.secondUserId;
    this.matchId = match.matchId;
}

Matches.add = (firstUserId, secondUserId, result) => {
    sql.query("INSERT INTO matches (user1_id, user2_id) VALUES (?, ?)", [firstUserId, secondUserId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Match added")
        result(null, res.insertId);
    });
};

Matches.findById = (matchId, result) => {
    sql.query("SELECT * FROM matches WHERE id = ?", [matchId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Match found: ",  res);
        result(null, res[0]);
    });
};

Matches.findByUserId = (userId, result) => {
    sql.query("SELECT * FROM matches WHERE user1_id = ? OR user2_id = ?", [userId, userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("found Match using id: ")
        result(null, res);
    });
};

Matches.removeOne = (matchId, result) => {
    sql.query("DELETE FROM matches WHERE id = ?", [matchId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`Match deleted`)
        result(null, res);
    });
}

module.exports = Matches;