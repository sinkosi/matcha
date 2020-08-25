const sql = require("./db");
const bcrypt = require('bcrypt');

//Constructor
const User = function(user) {
	this.username = user.username;
	this.email = user.email;
	this.firstname = user.firstname;
	this.lastname = user.lastname;
	this.password = user.password;
};

//CREATE A NEW CUSTOMER
User.create = (newUser, result) => {
	sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created user: ", { id: res.insertID, ...newUser });
		result(null, { id: res.insertID, ...newUser });
	});
};

//FIND A USER BY ID
User.findById = (userID, result) => {
	sql.query(`SELECT * FROM users WHERE id = ${userID}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("found user: ", res[0]);
			result(null, res[0]);
			return;
		}

		//User with that user id has not been found.
		result({ kind: "not found" }, null);
	});
};

//RETRIEVE ALL USER DATA
User.getAll = result => {
	sql.query("SELECT * FROM users", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("users: ", res);
		result(null, res);
	});
};

//UPDATE A USER BY ID
User.updateById = (id, user, result) => {
	sql.query(
		"UPDATE users SET email = ?, name = ?, active = ? WHERE id = ?",
		[user.email, user.name, user.active, id],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				//user not found or not changed
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated user: ", { id: id, ...user });
			result(null, { id: id, ...user });
		}
	);
};

//DELETE A USER
User.remove = (id, result) => {
	sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			//no user found or deleted with the above id
			result({ kind: "not_found" }, null);
			return;
		}

		console.log("deleted user with id: ", id);
		result(null, res);
	});
};

//DELETE EVERYONE, DUMB-ASS DECISION AT A MINIMUM
User.removeAll = result => {
	sql.query("DELETE FROM users", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} users`);
		result(null, res);
	});
};

/**
 * !=================================
 * !		Login (no encryption)	|
 * !=================================
 *
// FIND A USER BY USERNAME
User.findLogin = (username, password, result) => {
	sql.query(`SELECT * FROM users WHERE LOWER(username) = LOWER(${sql.escape(username.value)});`, (err, res) => {
		if (err) {
		// ?This mean the user does not exist
			console.log("error: ", err);
			result(err, null);
			return;
		}
		if (res.length && password.value === res[0].password ) {
			console.log("found user: ", res[0].password);
			result(null, res[0]);
			return;
		}
		//User with that user username has not been found.
		result({ kind: "not found" }, null);
	});
};

/**
 * !=================================
 * !		Signup (no encryption)	|
 * !=================================
 *
User.signup = (newUser, result) => {
	sql.query(`SELECT * FROM users WHERE LOWER(username) = ${sql.escape(newUser.username)};`, (err, res) => {
		if (err) {
			console.log("Some error occured", err);
			result(err, null);
			return;
		}
		if (res.length) {
			console.log("Username is already in use", err);
			result ({ kind: "inUse"}, null);
			return;
		} else {
			sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
				}
			})
		}
		console.log("created user: ", { id: res.insertID, ...newUser });
		result(null, { id: res.insertID, ...newUser });
	});
};

/**
 * !=================================
 * ?	Login (with encryption)		|
 * !=================================
 */
// FIND A USER BY USERNAME
User.findLogin = (username, password, result) => {
	sql.query(`SELECT * FROM users WHERE LOWER(username) = LOWER(${sql.escape(username.value)});`, (err, res) => {
		if (err) {
		// ?This mean the user does not exist
			console.log("error: ", err);
			result(err, null);
			return;
		}
		if (res.length && password.value === res[0].password ) {
			console.log("found user: ", res[0].password);
			result(null, res[0]);
			return;
		}
		//User with that user username has not been found.
		result({ kind: "not found" }, null);
	});
};

/**
 * !=================================
 * ?	Signup (with encryption)	|
 * !=================================
 */
User.signup = (newUser, result) => {
	sql.query(`SELECT * FROM users WHERE LOWER(username) = ${sql.escape(newUser.username)};`,
	(err, res) => {
		if (err) {
			console.log("Some error occured", err);
			result(err, null);
			return;
		}
		if (res.length) {
			console.log("Username is already in use", err);
			result ({ kind: "inUse"}, null);
			return;
		} else {
			bcrypt.hash(newUser.password, 10, (err, hash) => {
				if (err) {
					console.log("Bcrypt failure", err);
					result ({ kind: "bcrypt err"});
					return;
				} else {
					sql.query(`INSERT INTO users (username, email, firstname, lastname, password) VALUES
					(${sql.escape(newUser.username)}, ${sql.escape(newUser.email)}, ${sql.escape(newUser.firstname)},
					${sql.escape(newUser.lastname)}, ${sql.escape(hash)});`,
					(err, res) => {
						if (err) {
							console.log("error: ", err);
							result(err, null);
							return;
						}		
						console.log("created user: ", { id: res.insertID, ...newUser });
						result(null, { id: res.insertID, ...newUser });
					});
				};
			});
		};
	});
};

module.exports = User;