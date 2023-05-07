module.exports = (sequelize, Sequelize) => {
    const Wishlist = sequelize.define("wishlist", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    });
    
    return Wishlist;
};

