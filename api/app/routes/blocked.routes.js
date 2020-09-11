module.exports = app => {

    const blocked = require("../controllers/blocked.controller");

  

    //FIND A LIKE BY ITS LikerID
    app.get("/likes/:likerId", blocked.findByLikerId);



    app.post("/users/:userId/block", blocked.add)
    app.post("/users/:userId/unblock", blocked.remove)

}