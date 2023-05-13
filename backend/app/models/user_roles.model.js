module.exports = (sequelize, Sequelize) => {
    const UserRoles = sequelize.define("user_roles", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "roles",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      });
      
    return UserRoles;
}