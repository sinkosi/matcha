const sql = require("./db");

//Constructor
const User = function(user) {
	this.email = user.email;
	this.name = user.name;
	this.active = user.active;
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

module.exports = User;