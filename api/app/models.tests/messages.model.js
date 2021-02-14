const Messages = require("../models/messages.model");

let messeges = new Messages();

// messeges.add(1, 2, "hi there love", callback);
// messeges.add(2, 2, "I am a new message", callback);
// messeges.findByGroupId(2, callback);
messeges.findBySenderId(1, callback);

function callback(error, response) { console.log( error? {error}: {response});}