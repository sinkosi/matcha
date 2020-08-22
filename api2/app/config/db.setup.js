var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

/*
con.connect is code for establishing a connection and looking for an error
*/
con.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Database has Connected!\n")
  /*
  con.query is code for ensuring an SQL Statement can read or write to and from a
  MySql database. In the code below, sql is a placeholder for an instruction such
  as CREATE DATABASE mydb
  */
/*=======================================================================
||                        CREATE DATABASE                               ||
========================================================================*/
  var sql = "CREATE DATABASE IF NOT EXISTS matcha";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Creating Database 'matcha'");
  });

/*=======================================================================
||                           USE DATABASE                               ||
========================================================================*/
var sql = "USE matcha";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("SELECTING FOR USE - 'matcha'");
});

/*=======================================================================
||                        CREATE 'USER' TABLE                           ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.users (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(1) NULL,
  biography VARCHAR(255) NULL,
  sexual_preferences int(1) NULL,
  profile_pic int(20) NULL,
  location int(20)   NULL,
  activated INT(1) DEFAULT 0 NOT NULL,
  completed INT(1) DEFAULT 0 NOT NULL,
  registered TIMESTAMP  DEFAULT current_timestamp NOT NULL,
  modified TIMESTAMP  DEFAULT current_timestamp NOT NULL,
  activated_date TIMESTAMP NULL,
  completed_date TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'user'");
});

/*=======================================================================
||                   CREATE 'INTERESTS' TABLE                           ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.interests (
  hashtag VARCHAR(30)  NOT NULL PRIMARY KEY,
  added TIMESTAMP NOT NULL DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'interests'");
});


/*=======================================================================
||                   CREATE 'USERS_INTERESTS' TABLE                     ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.users_interests (
    id INT(4) NOT NULL PRIMARY KEY,
    user_id INT(11) NOT NULL ,
    interest_id VARCHAR(255) NOT NULL ,
    linked TIMESTAMP NOT NULL DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'users_interests'");
});

/*=======================================================================
||                   CREATE 'IMAGES' TABLE                             ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.images (
    id INT(11) NOT NULL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    user_id INT(11) NOT NULL,
    uploaded TIMESTAMP NOT NULL DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'images'");
});

/*=======================================================================
||                   CREATE 'ACTIVATION CODE' TABLE                    ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.activation_code (
    code VARCHAR(255) NOT NULL PRIMARY KEY,
    profile_id INT(11) NOT NULL,
    generation_time TIMESTAMP NOT NULL DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'activation_code'");
});

/*=======================================================================
||                   CREATE 'PROFILE LIKES' TABLE                      ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.profile_likes (
    id INT(11)  NOT NULL PRIMARY KEY,
    profile_id int(11)  NOT NULL ,
    liker_id int(11)  NOT NULL ,
    liked TIMESTAMP NOT NULL DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'profile_likes'");
});

/*=======================================================================
||                   CREATE 'PROFILE VISITS' TABLE                      ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.profile_visits (
    id INT(11)  NOT NULL PRIMARY KEY,
    profile_id INT(11)  NOT NULL ,
    visitor_id INT(11)  NOT NULL ,
    visited TIMESTAMP  NOT NULL DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
/*
-- fame_rating
-- ---
-- user_id UUID PK FK - users.id
-- fame_rating NUMERIC DEFAULT=0
*/
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'profile_visits'");
});

/*=======================================================================
||                   CREATE 'LOCATION' TABLE                           ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.location (
    id SERIAL  NOT NULL ,
    address1 TEXT  NULL ,
    address2 TEXT  NULL ,
    city TEXT  NULL ,
    state TEXT  NULL ,
    code TEXT  NULL ,
    longitude NUMERIC  NULL ,
    latitude NUMERIC  NULL ,
    user_id INT(11)  NOT NULL ,
    time TIMESTAMP  NOT NULL DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'location'");
});

/*=======================================================================
||                   CREATE 'MATCHES' TABLE                             ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.matches (
    id INT(11)  NOT NULL PRIMARY KEY,
    user1_id INT(11)  NOT NULL ,
    user2_id INT(11)  NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'matches'");
});

/*=======================================================================
||                   CREATE 'MESSAGES' TABLE                           ||
========================================================================*/
var sql = `CREATE TABLE matcha.messages (
    id SERIAL  NOT NULL PRIMARY KEY,
    sender INT(11)  NOT NULL ,
    send_group INT(11) NOT NULL ,
    time TIMESTAMP  NOT NULL DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'messages'");
});

/*=======================================================================
||                        CLOSE DATABASE                               ||
=======================================================================*/
  //Close the connection!
  con.end(function(err) {
    if (err) {
      return console.log('error: ' + err.message);
    }
    console.log("Connection has been Closed\n\nRUN npm start or node server.js");
  })
});