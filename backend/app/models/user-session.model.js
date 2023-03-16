module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
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

  const Session = sequelize.define('Session', {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  User.hasMany(Session);
  Session.belongsTo(User);

  return { User, Session };
}