const db = require("../models");
const Game = db.Game;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request 
    if (!req.body.title) {
        res.status(400).send(
            {
                message: "Content can not be empty!"
            });
        return;
    }

    // Create game
    const game = {
        title: req.body.title,
        description: req.body.description,
        pubplished: req.body.pubplished ? req.body.pubplished : false
    };

    // Save game in the database 
    Game.create(game)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial"
            });
        });
};

// Retrieve all games from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Game.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single game with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Game.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Game with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Game with id=" + id
            });
        });
};

// Update a game by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Game.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Game was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Game with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Game with id=" + id
            });
        });
};

// Delete a game with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Game.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Game was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Game with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch( err => {
            res.status(500).send({
                message: "Could not delete Game with id=" + id
            })
        })
};

// Delete all game from the database.
exports.deleteAll = (req, res) => {
    Game.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} games were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all games."
            });
        });
};

// Find all published game  
exports.findAllPublished = (req, res) => {
    Game.findAll({limit: 2, offset: 1, where: {published: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:   
                    err.message || "Some error occurred while retrieving games."
            });
        });
};