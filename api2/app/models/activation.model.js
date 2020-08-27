// !THIS FILE CAN BE DELETED!

const sql = require("./db");
const bcrypt = require('bcrypt');

//Constructor
const ActivationCode = function({userId, code}) {
	this.profile_id = userId;
	this.code = code;
};

//CREATE A NEW CUSTOMER
ActivationCode.create = (newUser, result) => {
	sql.query("INSERT INTO activation_code SET ?", newUser, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created new code: ", { id: res.insertID, ...newUser });
		result(null, { id: res.insertID, ...newUser });
	});
};




module.exports = ActivationCode;