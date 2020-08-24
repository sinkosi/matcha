var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mosima"
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
  email varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  active BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'user'");
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