const Images = require("../models/images.model")

require("../models/images.model")

var images = new Images()

// images.addOne("image/url.jpg", 1, callback);
// images.findById(8, callback);
// images.findByUserId(1, callback)
images.removeOne(7, callback)

function callback(error, results){ console.log(error? {error}: {results})}
