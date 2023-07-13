const db = require("../models");
const Game = db.game;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");


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
        // pubplished: req.body.pubplished ? req.body.pubplished : false
    };

    // Save game in the database 
    Game.create(game)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Game"
            });
        });
};

// Retrieve all games from the database.
exports.findAllWithTitle = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Game.findAll({ where: condition })
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

// Retrieve all games.
exports.findAll = (req, res) => {
    Game.findAll()
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

function parseQuery(query) {
    const params = new URLSearchParams(query);
    const filter = {};

    // Extract the "price" property from the query string
    const price = params.get("price");
    let maxPrice = parseFloat(price) || 10e9;
    if (price) {
        filter.discountedPrice = {
        [Op.lte]: maxPrice,
        };
    }

    // Extract the "features" property from the query string
    let features = params.get("features");    
    if (features) {
        features = features.split(",");
        filter.features = {
            [Op.and]: [Sequelize.literal(`JSON_CONTAINS(features, '${JSON.stringify(features)}')`)],
        };
    }

    // Extract the "genres" property from the query string
    let genres = params.get("genres");
    if (genres) {
        genres = genres.split(",");
        filter.genres = {
            [Op.and]: [Sequelize.literal(`JSON_CONTAINS(genres, '${JSON.stringify(genres)}')`)],
        };
    }

    // Extract the "platform" property from the query string
    let platform = params.get("platform");
    if (platform) {
        platform = platform.split(",");
        // console.log(`'${JSON.stringify(platform)}'`)
        filter.platform = {
            [Op.and]: [Sequelize.literal(`JSON_CONTAINS(platform, '${JSON.stringify(platform)}')`)],
        };
    };

    return filter;
};

exports.fiterGames = async (req, res) => {
    const { query } = req;
    const where = parseQuery(query);
    try {
        // console.log(where)
        const data = await Game.findAll({where});
        res.send(data);
    } 
    catch (err) {
        res.status(500).send({
            message:   
                err.message || "Some error occurred while retrieving games."
        });
    }
}

exports.searchGames = async (req, res) => {
    const { query } = req;
    const params = new URLSearchParams(query);
    const searchTerm = params.get("term");
    const where = searchTerm
        ? { title: { [Op.iLike]: `%${searchTerm.toLowerCase()}%` } }
        : {};

    try {
      const data = await Game.findAll();
      const searchData = data.filter(
        item => item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    //   console.log(searchData);
      res.send(searchData);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games."
      });
    }
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
    // console.log(req.body.game)
    Game.update(req.body.game, {
        where: { id: id },
        returning: true})
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
                    message: `Cannot delete Game with id=${id}. Maybe Game was not found!`
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
