module.exports = app => {

    const likes = require("../controllers/likes.controller");

    //Create a new like
    app.post("likes/", likes.likesCreate);

    //FIND A LIKE BY ITS LikerID
    app.get("likes/:likerId", likes.findByLikerId);

    //FIND AN INTEREST BY ITS ID
    app.get("likes/:profileId", likes.findByProfileId);

    //Remove a Like
    app.delete("likes/:likeId/:profileId", likes.DeleteLike);

}