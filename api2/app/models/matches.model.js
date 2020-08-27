const sql = require("./db");

//Constructor
const Matches = function() {

    this.add = (firstUserId, SecondUserId, callback) => {
        sql.query("INSERT INTO matches (user1_id, user2_id) VALUES (?, ?)", [firstUserId, SecondUserId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            
            callback(null, res.insertId);
        });
    };


    this.findById = (matchId, callback) => {
        sql.query("SELECT * FROM matches WHERE id = ?", [matchId], (err, res) => {
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
        sql.query("SELECT * FROM matches WHERE user1_id = ? OR user2_id = ?", [userId, userId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            callback(null, res);
            return;
        });
    };



    this.removeOne = (matchId, callback) => {
        sql.query("DELETE FROM matches WHERE id = ?", [matchId], (err, res) => {
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

module.exports = Matches;