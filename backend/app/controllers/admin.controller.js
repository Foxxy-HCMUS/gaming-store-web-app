const db = require("../models");
const Admin = db.admin;
const User = db.user;
const Role = db.role;
const UserRoles = db.user_roles;
const sequelize = require("sequelize");
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.fetchAdmin = async (req, res) => {
  Admin.findByPk(req.userId).then((admin) => {
    res.status(200).send({
      "id": admin.id,
      "username": admin.username,
      "email": admin.email,
      "firstName": admin.firstName,
      "lastName": admin.lastName,
    });
  });
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
  });
};  

exports.removeUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
      where: {id: id}
  })
      .then(num => {
          if(num == 1){
              res.send({
                  message: "User was deleted successfully!"
              });
          } else {
              res.send({
                  message: `Cannot remove User with id=${id}!`
              });
          }
      })
      .catch( err => {
          res.status(500).send({
              message: "Could not remove User with id=" + id
          })
      })
};

exports.fetchAllUser = async (req, res) => {
  User.findAll({
    attributes: { exclude: ['password']},
    include: [{
      model: Role,
      attributes: ['name'],
      through: { attributes: [] },
      where: {
        name: { [Op.like]: '%admin%' }
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



