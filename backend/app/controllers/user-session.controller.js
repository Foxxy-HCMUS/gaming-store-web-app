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

// exports.allAccess = (req, res) => {
//     res.status(200).send("Public content.");
// };

// exports.userBoard = (req, res) => {
//     res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//     res.status(200).send("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
//     res.status(200).send("Moderator Content.");
// };

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