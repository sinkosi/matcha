Location = {}
const sql = require("./db");

Location.addOne = (location, result) => {
	sql.query("INSERT INTO location SET ?", location, (err, res) => {
		if (err){
			console.log(err)
			result(err, null)
			return
		}
		else {
			//console.log(res)
			result(null, res.insertId)
		}
	})
}

module.exports = Location;