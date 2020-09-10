module.exports = app => {

    const likes = require("../controllers/likes.controller");

  

    //FIND A LIKE BY ITS LikerID
    app.get("/likes/:likerId", likes.findByLikerId);

    //FIND AN INTEREST BY ITS ID
    app.get("/likes/:profileId", likes.findByProfileId);



    app.post("/users/:userId/like", likes.add)
    app.post("/users/:userId/unlike", likes.remove)

}