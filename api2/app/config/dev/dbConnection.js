require { pool } from './pool';
//var pool = require('pool');

pool.on('connect', () => {
	console.log('connected to the db');
});

/** CREATE A TABLE */

const createUserTable = () => {
	const userCreateQuery = `CREATE TABLE IF NOT EXISTS users_test
	(id SERIAL PRIMARY KEY,
	email VARCHAR(100) UNQIUE NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	password VARCHAR(100) NOT NULL,
	created_on DATE NOT_NULL)`;

	pool.query(userCreateQuery)
		.then((res) => {
			console.log("dbConnection.js " + res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/** DROP A TABLE */

const dropUserTable = () => {
	const usersDropQuery = `DROP TABLE IF EXISTS users_test`;
	pool.query(usersDropQuery)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/** CREATE All Tables */

const createAllTables = () => {
	createUserTable();
}

/**
 * DROP ALL TABLES
 */
const dropAllTables = () => {
	dropUserTable();
};

pool.on('remove', () => {
	console.log('client removed');
	process.exit(0);
});

module.exports = createAllTables;
/*module.exports = createDB {
	createAllTables,
	dropAllTables,
};*/

require('make-runnable');