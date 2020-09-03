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
        const sqlQuery = `SELECT profile_visits.profile_id as id, users.username
                    FROM profile_visits LEFT JOIN users ON users.id = profile_visits.profile_id 
                    WHERE profile_visits.visitor_id = ?`
        sql.query(sqlQuery, [visitorId], (err, res) => {
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
        const sqlQuery = `SELECT profile_visits.visitor_id as id, users.username
                        FROM profile_visits LEFT JOIN users ON users.id = profile_visits.visitor_id 
                        WHERE profile_visits.profile_id = ?`
        sql.query(sqlQuery, [profileId], (err, res) => {
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

module.exports = new Visits();