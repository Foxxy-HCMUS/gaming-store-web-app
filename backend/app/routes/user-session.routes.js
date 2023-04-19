// module.exports = app => {
//     const user_session = require("../controllers/user-session.controller.js");

//     var router = require("express").Router();

//     // Create a new Tutorial
//     router.post("/create", user_session.create);

//     // Retrieve all Tutorials 
//     router.get("/", user_session.findAll);

//     // Retrieve all published Tutorials
//     router.get("/", user_session.findAllPublished);

//     // Retrieve a single Tutorial with id
//     router.get("/:id", user_session.findOne);

//     // Update a Tutorial with id
//     router.put("/:id", user_session.update);

//     // Delete a Tutorial with id
//     router.delete("/:id", user_session.delete);

//     // Delete all Tutorials
//     router.delete("/", user_session.deleteAll);

//     app.use('/api/user', router);

// }