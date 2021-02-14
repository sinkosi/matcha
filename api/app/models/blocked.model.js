const sql = require("./db");

const Blocked = function(block) {
	this.blocker_id = block.blockerId
	this.blocked_id = block.blockedId
}

Blocked.add = (blockerId, blockedId, result) => {
	sql.query("INSERT INTO blocked (blocker_id, blocked_id) VALUES (?, ?)", [blockerId, blockedId], (err, res) => {
		if (err) {

			result(err, null);
			return;
		}
		result(null, res.insertId);
	});
};

Blocked.findByBlockerId = (blockerId, result) => {
	const sqlQuery =`SELECT blocked.blocked_id as id, users.username
				FROM blocked LEFT JOIN users ON users.id = blocked.blocked_id 
				WHERE blocked.blocker_id = ?`
	sql.query(sqlQuery, [blockerId], (err, res) => {
		if (err) {
			result(err, null);
			return;
		}
		result(null, res);
	});
};

Blocked.findByBlockedId = (blockedId, result) => {
	const sqlQuery = `SELECT blocked.blocker_id as id, users.username
			FROM blocked LEFT JOIN users ON users.id = blocked.blocker_id 
			WHERE blocked.blocked_id = ?`
	sql.query(sqlQuery, [blockedId], (err, res) => {
		if (err) {
			result(err, null);
			return;
		}
		result(null, res);
	});
};


Blocked.remove = (blockerId, blockedId, result) => {
	sql.query("DELETE FROM blocked WHERE blocker_id = ? AND blocked_id = ?", [blockerId, blockedId], (err, res) => {
		if (err) {
			result(err, null);
			return;
		}
		else {
			result(null, res);
		}
	});
}

Blocked.didUserBlockUser = (blockerId, blockedId, result) => {
	sql.query("SELECT * FROM blocked WHERE blocker_id = ? AND blocked_id = ?", [blockerId, blockedId], (err, res) => {
		if (err) {
			result(err, null);
			return;
		}
		if (res.length < 1)
			res = false
		else
			res = true
		result(null, res);
	});
}

module.exports = Blocked;