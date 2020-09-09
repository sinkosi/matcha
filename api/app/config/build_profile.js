const mysql = require('mysql');
const db = require('./db.config');


var con = mysql.createConnection({
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.DB
});

/**
 * ? UPDATE USER
 */
var sql = `UPDATE matcha.users
SET location = 1, profile_pic = 1
;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Updating default user");
});


//Close the connection!
con.end(function(err) {
    if (err) {
        return console.log('error: ' + err.message);
    }
    console.log("Connection has been Closed");
})
;