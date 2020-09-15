module.exports = app => {
    
    const matches = require("../controllers/matches.controller");

    //Create a new match
    app.get("/matches", matches.get)
    //Find a match by Id

    //Find match by userId

    //Delete a match
}