module.exports = (sequelize, Sequelize) => {
    const UserRoles = sequelize.define("user_roles", {
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'User',
            key: 'id'
          }
        },
        roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Role',
            key: 'id'
          }
        }
      });
      
    return UserRoles;
}