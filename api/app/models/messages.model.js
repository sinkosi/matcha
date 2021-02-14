
const sql = require("./db");

const Messages = function() {

    this.add = (senderId, groupId, message, callback) => {
        sql.query("INSERT INTO messages (sender, send_group, message) VALUES (?, ?, ?)", [senderId, groupId, message], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            
            callback(null, res.insertId);
        });
    };


    this.findByGroupId = (groupId, callback) => {
        sql.query("SELECT * FROM messages WHERE send_group = ?", [groupId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            callback(null, res);
            return;
        });
    };

    this.findBySenderId = (senderId, callback) => {
        sql.query("SELECT * FROM messages WHERE sender = ?", [senderId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            callback(null, res);
            return;
        });
    };



}

module.exports = Messages;