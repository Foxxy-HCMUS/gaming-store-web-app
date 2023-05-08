const db = require("../models");
const Wishlist = db.wishlist;

exports.getWishlist = (req, res) => {
    Wishlist.findAll({ where: { userId: req.user.id } })
    .then(wishlists => res.json(wishlists))
    .catch(err => console.log(err));
};

exports.addToWishlist = (req, res) => {
    Wishlist.create({ 
        userId: req.user.id,
        gameId: req.body.gameId
      })
      .then(wishlist => res.json(wishlist))
      .catch(err => console.log(err)); 
};

exports.deleteFromWishlist = (req, res) => {
    Wishlist.destroy({ where: { id: req.params.id } })
    .then(result => res.json(result))
    .catch(err => console.log(err));
};