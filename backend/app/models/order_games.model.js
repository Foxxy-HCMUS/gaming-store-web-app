module.exports = (sequelize, Sequelize) => {
    const OrderGames = sequelize.define("order_games", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    gameId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "games",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });
  return OrderGames;

  
}