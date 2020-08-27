const sql = require("./db");

const Visits = function() {

    this.add = (visitorId, profileId, callback) => {
        sql.query("INSERT INTO profile_visits (profile_id, visitor_id) VALUES (?, ?)", [profileId, visitorId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            
            callback(null, res.insertId);
        });
    };


    this.findByVisitorId = (visitorId, callback) => {
        sql.query("SELECT * FROM profile_visits WHERE visitor_id = ?", [visitorId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            callback(null, res);
            return;
        });
    };

    this.findByProfileId = (profileId, callback) => {
        sql.query("SELECT * FROM profile_visits WHERE profile_id = ?", [profileId], (err, res) => {
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

module.exports = Visits;