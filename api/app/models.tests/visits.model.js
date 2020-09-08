const Visits = require("../models/visits.model")

let visits =  new Visits();

// visits.add(1, 2, callback);
// visits.findByVisitorId(2, callback);
visits.findByProfileId(1, callback);



function callback(error, results){ console.log(error? {error}: {results})}
