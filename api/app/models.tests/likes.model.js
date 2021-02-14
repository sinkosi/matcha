const Likes = require("../models/likes.model")


var likes = new Likes;

// likes.add(2,1, callback);
// likes.findByLikerId(1, callback);
likes.findByProfileId(1, callback)
// likes.removeOne(2, 1, callback);



function callback(error, results){ console.log(error? {error}: {results})}
