module.exports = app => {

    const images = require("../controllers/images.controller")
    
//     //Retrieve all images
    app.get("/images", images.findAllImg)
    
//     //Create new Image
    // app.post("/images", images.imgCreate);

    app.post("/images/upload/:userId", (req, res)=>{ images.upload(req,res)})

//     //Find Image by Image ID
    app.get("images/:imageId", images.findOneImg);

//     //Find Image by User ID
    app.get("users/images/:userId", images.findImgbyUserId);

//     //Delete An Image
    app.delete("images/:imageId", images.deleteOneImage);
};