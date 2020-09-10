module.exports = app => {

    const interest = require("../controllers/interest.controller")
    
    //Retrieve all interests
    app.get("/interests", interest.findAllInterests)

    
    
    //Create new interest
    app.post("/interest", interest.interestCreate);

    //Find Image by Image ID
    app.get("images/:imageId", interest.findOneInterest);

    //Delete An Interest
    //app.delete("images/:imageId", images.deleteOneImage);
};