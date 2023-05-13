module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wishlist: {
        type: Sequelize.JSON,
        // defaultValue: [],
      },
      cart: {
        type: Sequelize.JSON,
        // defaultValue: [],
      },
      // order: {
      //   type: Sequelize.JSON,
      // },
    },
  );

  const Session = sequelize.define("session", {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  User.hasMany(Session);
  Session.belongsTo(User);

  return { User, Session };
};
