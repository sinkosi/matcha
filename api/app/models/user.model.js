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

//CREATE A NEW USER
User.create = (newUser, result) => {
	sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created user: ", { id: res.insertId, ...newUser });
		result(null, { id: res.insertId, ...newUser });
	});
};

//FIND A USER BY ID
User.findById = (userID, result) => {
	sql.query(`SELECT 
					users.id as id, users.username, users.email, users.firstname, users.lastname, users.gender, 
					users.biography, users.sexual_preferences, users.date_of_birth, users.activated, 
					users.completed,  images.url as profile_pic, COALESCE(location.city, "Unknown") as city, COALESCE(mat.matches, 0) AS matches, COALESCE(vs.visits, 0) AS visits, COALESCE(lk.likes, 0) as likes, (COALESCE(mat.matches, 0) + COALESCE(vs.visits, 0) + COALESCE(lk.likes, 0)) as popularity
				FROM users
					LEFT JOIN images ON users.profile_pic = images.id
					LEFT JOIN location ON users.location = location.id
					LEFT JOIN (
								SELECT user1_id as id, COUNT(user1_id) as matches 
								FROM (SELECT user1_id, user2_id FROM matches UNION SELECT user2_id as user1_id, user1_id as user2_id FROM matches) AS x GROUP BY user1_id
							) AS mat ON users.id = mat.id
					LEFT JOIN ( SELECT profile_id as id, (COUNT(DISTINCT(profile_id)) / 10) as visits FROM profile_visits GROUP BY profile_id ) AS vs ON users.id = vs.id
					LEFT JOIN ( SELECT profile_id as id, (COUNT(DISTINCT(profile_id)) / 2) as likes FROM profile_likes GROUP BY profile_id ) AS lk ON users.id = lk.id
				WHERE users.id=?`,[userID], (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			// console.log("found user: ", res[0]);
			result(null, res[0]);
			return;
		}

		//User with that user id has not been found.
		result({ kind: "not found" }, null);
	});
};

User.findByEmail = (email, result) => {
	sqlQuery = `SELECT 
			u.id, u.username, u.email, u.firstname, u.lastname, u.gender, 
			u.biography, u.sexual_preferences, u.date_of_birth, u.activated, 
			u.completed,  i.url as profile_pic
		FROM users as u LEFT JOIN images as i ON u.profile_pic = i.id
		WHERE u.email='${email}'`;

	sql.query(sqlQuery, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			// console.log("found user: ", res[0]);
			result(null, res[0]);
			return;
		}

		//User with that user id has not been found.
		result({ kind: "not found" }, null);
	});
};

//RETRIEVE ALL USER DATA
User.getAll = (loggedInUserId, filter, result) => {
	sqlQuery = `SELECT 
					users.id as id, users.username, users.email, users.firstname, users.lastname, users.gender, 
					users.biography, users.sexual_preferences, users.date_of_birth, users.activated, 
					users.completed,  images.url as profile_pic, COALESCE(location.city, "Unknown") as city, COALESCE(mat.matches, 0) as matches, COALESCE(vs.visits, 0) as visits, COALESCE(lk.likes, 0) as likes, ( COALESCE(mat.matches, 0) + COALESCE(vs.visits,0) + COALESCE(lk.likes, 0)) as popularity
				FROM users
					LEFT JOIN images ON users.profile_pic = images.id
					LEFT JOIN location ON users.location = location.id
					LEFT JOIN (
								SELECT user1_id as id, COUNT(user1_id) as matches 
								FROM (SELECT user1_id, user2_id FROM matches UNION SELECT user2_id as user1_id, user1_id as user2_id FROM matches) AS x GROUP BY user1_id
							) AS mat ON users.id = mat.id
					LEFT JOIN ( SELECT profile_id as id, (COUNT(DISTINCT(profile_id)) / 10) as visits FROM profile_visits GROUP BY profile_id ) AS vs ON users.id = vs.id
					LEFT JOIN ( SELECT profile_id as id, (COUNT(DISTINCT(profile_id)) / 2) as likes FROM profile_likes GROUP BY profile_id ) AS lk ON users.id = lk.id
				WHERE users.id!=? ${filter}`;
	sql.query(sqlQuery, [loggedInUserId], (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		// console.log("users: ", res);
		result(null, res);
	});
};

//UPDATE A USER BY ID
User.updateById = (id, user, result) => {
	sql.query(
		"UPDATE users SET ? WHERE id = ?", [user, id], (err, res) => {
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

			// console.log("updated user: ", { id: id, ...user });
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

//UPDATE USER WITH ACTIVATION CODE
User.updateByIdCode = (id, code, result) => {
	sql.query(
		`SELECT * FROM activation_code where profile_id = ? AND code = ?`,
		[id, code],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, res);
				return;
			}
			if (!res.length) {
				//user not found or not changed
				result({ kind: "not_found" }, null);
				return;
			}
			if (res.length) {
				sql.query(`UPDATE matcha.users SET activated = 1, activated_date = NOW() WHERE id = ?`,
				[id],
				(err, res) => {
					if (err) {
						console.log("error: ", err);
						result(null, err);
						return;
					}
					if (res.affectedRows == 0) {
						//user not found or not changed
						result({ kind: "db" }, null);
						return;
					}
					if (res.affectedRows == 1) {
						//Code has worked, it must be deleted from DB
						sql.query(
							`DELETE FROM activation_code where profile_id = ? AND code = ?`,
							[id, code],
							(err, res) => {
								if (err) {
									console.log("error: ", err);
									result(err, null);
									return;
								}
								if (res.affectedRows == 0) {
									//user not found or not changed
									result({ kind: "not_found" }, null);
									return;
								}
								console.log("deleted user activation code for user with ID: ", id);
								//User code has been deleted
							}
						)
					}
				// console.log(`updated user: ${id}`)//, { id: id, ...user });
				result(null, { id: id});
				return;
				}
			)}
		}
	);
};

/**
 * !=================================
 * ?	Login (with encryption)		|
 * !=================================
 */
// FIND A USER BY USERNAME
User.findLogin = (username, password, result) => {
	sqlQuery = `SELECT 
			u.id, u.username, u.email, u.firstname, u.lastname, u.gender, 
			u.biography, u.sexual_preferences, u.date_of_birth, u.activated, 
			u.completed, u.password,  i.url as profile_pic
		FROM users as u LEFT JOIN images as i ON u.profile_pic = i.id
		WHERE (LOWER(username) = ? OR LOWER(email) = ?);`;
	sql.query(sqlQuery, [(username), (username)],
	(err, res) => {
		if (err) {
		// ?This mean something wrong with the query or sql server connection
			console.log("error: ", {err});
			result({kind: "internal"}, null);
			return;
		} else {
			//This means username or email does not exist
			if (!res.length) {
				console.log("username does not exist");
				result({ kind: "not_found" }, null);
				return;
			}
			if (res.length && !bcrypt.compareSync(password, res[0].password)) {
				console.log("incorrect username password combination!");
				result({ kind: "invalid" }, null);
				return;
			}
			if (res.length && bcrypt.compareSync(password, res[0].password) && (res[0].activated === 0)) {
				console.log("Account not yet authorised! Please check email!");
				result({ kind: "valid" }, null);
				return;
			}
			if (res.length && bcrypt.compareSync(password, res[0].password) && res[0].activated == 1) {
				console.log("found user: ", res[0].username);
				console.log("found user: ", res[0]);
				result(null, res[0]);
				return;
			}
		}
		// //User with that user username has not been found.
		// result({ kind: "not_found" }, null);
	});
};

/**
 * !=================================
 * ?	Signup (with encryption)	|
 * !=================================
 */
User.signup = (newUser, result) => {
	sql.query(`SELECT * FROM users WHERE LOWER(username) = ?;`, [(newUser.username)],
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
					sql.query(`INSERT INTO users (username, email, firstname, lastname, password) 
					VALUES (?, ?, ?, ?, ?);`,
					[
						(newUser.username),
						(newUser.email),
						(newUser.firstname),
						(newUser.lastname),
						(hash)
					],
					(err, res) => {
						if (err) {
							console.log("error: ", err);
							result(err, null);
							return;
						}		
						// console.log("created user: ", { id: res.insertId, ...newUser });
						result(null, { id: res.insertId, ...newUser });
					});
				};
			});
		};
	});
};

module.exports = User;