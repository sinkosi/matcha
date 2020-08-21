//const mysql = require("mysql");
const pg = require('pg');
const dbConfig = require("../config/db.config");

//postgres://postgres:password@localhost:5432/matcha
//Create a connection to the database
/*const connection = mysql.createConnection({
	host:	dbConfig.HOST,
	user:	dbConfig.USER,
	password:	dbConfig.PASSWORD,
	database:	dbConfig.DB
});*/
/*
var pgac = require('pg');

const connection = new pgac({
  user: 'postgres',
  host: 'localhost',
  database: 'matcha',
  password: 'password',
  port: 5432,
})

//Open the MySQL connection using const var defined above
connection.connect(error => {
	if (error) throw error;
	console.log("model/db.js: MySQL Database has Connected!")
});

module.exports = connection;*/