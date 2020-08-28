const sql = require("./db");
const { query } = require("express");

/**
 * ? CONSTRUCTOR
 */

const Interests = function(interest) {
    this.hashtag = interest.hashtag;
    this.user_id = interest.user_id;
}

Interests.addMany = (userId, interestsArray, result) => {
    querystr = "";
    interestsArray.forEach(interest => {
        querystr += `INSERT INTO interests (hashtag, user_id) VALUES ('${interest}', '${userId}'); `
    });
    console.log(querystr);
    sql.query(querystr, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`Interests add for user with id: ${userId}`, res);
        result(null, res.insertId);
    });
}

Interests.add = (userId, interest, result) => {
    sql.query("INSERT INTO interests (hashtag, user_id) VALUES (?, ?)", [interest, userId], 
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



module.exports = Interests;