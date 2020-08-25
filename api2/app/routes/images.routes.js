module.exports = (app) => {

    const images = require("../controllers/images.controller")

    app.get("/images", images.getAll)
}