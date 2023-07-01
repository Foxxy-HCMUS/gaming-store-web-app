// const db = require("../models");
// const User_session = db.user_session;
// const Op = db.Sequelize.Op;

// // Create and Save a new user
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.email) {
//         res.status(400).send(
//             {
//                 message: "Content can not be empty!"
//             });
//         return;
//     }

//     // Create user
//     const user_session = {
//         email: req.body.email,
//         password: req.body.password,
//     };

//     // Save user in the database
//     User_session.User.create(user_session)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating account"
//             });
//         });
// };

// // Retrieve all Users from the database.
// exports.findAll = (req, res) => {
//     const email = req.query.email;
//     var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

//     User_session.User.findAll({ where: condition })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         });
// };

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     User_session.User.findByPk(id)
//         .then(data => {
//             if (data) {
//                 res.send(data);
//             } else {
//                 res.status(404).send({
//                     message: `Cannot find User with id=${id}`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving User with id=" + id
//             });
//         });
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;

//     User_session.User.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "User was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update User with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating user with id=" + id
//             });
//         });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     User_session.User.destroy({
//         where: {id: id}
//     })
//         .then(num => {
//             if(num == 1){
//                 res.send({
//                     message: "User was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`
//                 });
//             }
//         })
//         .catch( err => {
//             res.status(500).send({
//                 message: "Could not delete User with id=" + id
//             })
//         })
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     User_session.User.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//             res.send({message: `${nums} users were deleted successfully!`});
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while removing all users."
//             });
//         });
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     User_session.User.findAll({limit: 2, offset: 1, where: {published: true}})
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving users."
//             });
//         });
// };

const db = require("../models");
const Wishlist = db.wishlist;
const User = db.user;
const Game = db.game;
const Role = db.role;
const UserRoles = db.user_roles;
const sequelize = require("sequelize");
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.fetchUser = async (req, res) => {
  User.findByPk(req.userId).then((user) => {
    res.status(200).send({
      "id": user.id,
      "username": user.username,
      "email": user.email,
      "cart": user.cart,
      "order": user.order,
      "wishlist": user.wishlist,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "wallet": user.wallet,
    });
  });
};

exports.fetchAllUser = async (req, res) => {
  User.findAll({
    attributes: { exclude: ['password']},
    include: [{
      model: Role,
      attributes: ['name'],
      through: { attributes: [] }, // exclude User_Role join table from result set
      // where: {
      //   id: 1
      // },
      where: {
        name: { [Op.like]: '%user%' }
      },
      required: true
    },]
  }).then((users) => {
    res.status(200).send(users);
  })
  
};

exports.findAllUserRoles = async (req, res) =>{
  UserRoles.findAll()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving games."
          });
      });
}

// check username availability
exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.body;

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    res.json({ status: false, message: "Username is already taken" });
  } else {
    res.json({ status: true, message: "Username is available" });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToWishlist = async (req, res) => {
  const userId = req.userId;
  const { gameId } = req.body;

  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user){
      return res.status(404).json({ message: "User not found" });
    }
    // parse user.wishlist to turn it into array before appendding new game
    const wishlist = JSON.parse(user.wishlist || "[]");
    if (wishlist.includes(gameId)) {
      return res.status(400).json({ message: "Product already in wishlist." });
    }
    const updatedWishlist = [...wishlist, gameId];
    const updatedUser = await user.update({ wishlist: JSON.stringify(updatedWishlist)}, { returning: true });

    // another way to update
    // await user.addToWishlist(gameId);
    res.status(200).json({ message: 'Product added to wishlist.', wishlist: updatedWishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const userId = req.userId;
  const { gameId } = req.body;

  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user){
      return res.status(404).json({ message: "User not found" });
    }
    // parse user.wishlist to turn it into array before appendding new game
    const wishlist = JSON.parse(user.wishlist || "[]");
    if (!wishlist.includes(gameId)) {
      return res.status(400).json({ message: "Game is not in wishlist." });
    }
    const updatedWishlist = wishlist.filter((id) => id !== gameId);
    const updatedUser = await user.update({ 
      wishlist: JSON.stringify(updatedWishlist)}, 
    { returning: true });

    // another way to update
    // await user.addToWishlist(gameId);
    res.status(200).json({ message: 'Product removed from wishlist.', wishlist: updatedWishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addToCart = async (req, res) => {
  const userId = req.userId;
  const { gameId } = req.body;

  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user){
      return res.status(404).json({ message: "User not found" });
    }
    // parse user.wishlist to turn it into array before appendding new game
    const cart = JSON.parse(user.cart || "[]");
    if (cart.includes(gameId)) {
      return res.status(400).json({ message: "Product already in cart." });
    }
    const updatedCart = [...cart, gameId];
    const updatedUser = await user.update({ cart: JSON.stringify(updatedCart)}, { returning: true });

    // another way to update
    // await user.addToWishlist(gameId);
    res.status(200).json({ message: 'Product added to cart.', cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const userId = req.userId;
  const { gameId } = req.body;

  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user){
      return res.status(404).json({ message: "User not found" });
    }
    // parse user.wishlist to turn it into array before appendding new game
    const cart = JSON.parse(user.cart || "[]");
    if (!cart.includes(gameId)) {
      return res.status(400).json({ message: "Game is not in cart." });
    }
    const updatedcart = cart.filter((id) => id !== gameId);
    const updatedUser = await user.update({ 
      cart: JSON.stringify(updatedcart)}, 
    { returning: true });

    // another way to update
    // await user.addTocart(gameId);
    res.status(200).json({ message: 'Product removed from cart.', cart: updatedcart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.SubtractWallet = async (req, res) =>{
  const userId = req.userId
  const { payment } = req.body
  console.log(req.body)
  try{
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user){
      return res.status(404).json({ message: "User not found" });
    }
    const wallet = JSON.parse(user.wallet || 0);
    if (wallet < payment){
      return res.status(200).json({message: "Not enough money"});
    }
    else{
      const updateWallet = payment;
      const updateUser = await user.update({
        wallet: JSON.stringify(updateWallet)
      }, {returning: true});
    }
    res.status(200).json({message: "Wallet is subtracted"})
  } catch(err){
    console.error(err);
    res.status(500).json({message: "Intercal server error"})
  }
}