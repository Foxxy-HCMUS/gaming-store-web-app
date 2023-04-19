module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING, 
      allowNull: false,
      unique: true
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
  });

  const Session = sequelize.define("session", {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  User.hasMany(Session);
  Session.belongsTo(User);

  return { User, Session };
}