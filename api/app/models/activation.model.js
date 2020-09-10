

const sql = require("./db");
const bcrypt = require('bcrypt');

//Constructor
const ActivationCode = function({userId, code}) {
	this.profile_id = userId;
	this.code = code;
};

//CREATE A NEW CUSTOMER
ActivationCode.create = (newCode, result) => {
	sql.query("INSERT INTO activation_code SET ?", newCode, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("Activation Model: created new code: ", { id: res.insertId, ...newCode });
		result(null, { id: res.insertId, ...newCode });
	});
};

ActivationCode.findByProfileId = (profileId, result) => {
	sql.query("SELECT * FROM activation_code WHERE profile_id = ?", profileId, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("found activation code: ", res );
		result(null, res[res.length - 1]);
	});
};


ActivationCode.removeByProfileId = (profileId, result) => {
	sql.query("DELETE FROM activation_code WHERE profile_id = ?", profileId, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("found activation code: ", res );
		result(null, res);
	});
};


module.exports = ActivationCode;