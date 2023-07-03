module.exports = app => {
    const { authJwt } = require("../middlewares");

    const games = require("../controllers/game.controller.js");

    const router = require("express").Router();

    // Create a new Game
    router.post("/create", games.create);

    // Retrieve all Games with title
    router.get("/", games.findAllWithTitle);

    // Retrieve all Games
    router.get("/",games.findAll);

    // Retrieve all published Games
    router.get("/", games.findAllPublished);

    router.get("/search", games.searchGames);

    router.get("/filters", games.fiterGames);

    // Retrieve a single Game with id
    router.get("/:id", games.findOne);

    // Update a Game with id
    router.put("/:id", games.update);

    // Delete a Game with id
    router.delete("/:id", games.delete);

    // Delete all Games
    router.delete("/", games.deleteAll);


    app.use('/games', router);

}