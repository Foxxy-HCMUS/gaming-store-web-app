module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        orderDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        orderStatus: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        orderTotal: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        orderPayment: {
            type: Sequelize.JSON,
            allowNull: false,
        },

    });
    
    
    return Order;
};

