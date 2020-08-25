const Matches = require("../models/matches.model")


var matches = new Matches()
// matches.add(1, 2, callback);
// matches.findById(2, callback);
matches.findByUserId(2, callback)
// images.removeOne(7, callback)

function callback(error, results){ console.log(error? {error}: {results})}
