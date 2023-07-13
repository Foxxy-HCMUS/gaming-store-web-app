const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./user-session.model.js")(sequelize, Sequelize).User;
db.role = require("./role.model.js")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.model.js")(sequelize, Sequelize);
db.game = require("./game.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.order_games = require("./order_games.model.js")(sequelize, Sequelize);
User_Role = require("./user_roles.model.js")(sequelize, Sequelize);
// db.wishlist = require("./wishlist.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: User_Role,
    // foreignKey: "roleId",
    // otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: User_Role,
    // foreignKey: "userId",
    // otherKey: "roleId"
});

User_Role.belongsTo(db.user);
User_Role.belongsTo(db.role);

db.user_roles = User_Role;

db.refreshToken.belongsTo(db.user, {
    foreignKey: "userId", targetKey: "id"
});

db.user.hasOne(db.refreshToken, {
    foreignKey: "userId", sourceKey: "id"
});

// db.wishlist.belongsTo(db.user);
// db.wishlist.belongsTo(db.game);
db.order.belongsTo(db.user, {
    foreignKey: "userId", targetKey: "id"
});
db.user.hasMany(db.order, {
    foreignKey: "userId", 
    sourceKey: "id"
});

db.order.hasMany(db.order_games, {
    foreignKey: 'orderId',
});
db.order_games.belongsTo(db.order, {
foreignKey: 'orderId',
});

db.order_games.belongsTo(db.game, { 
    foreignKey: 'gameId',
});
db.game.hasMany(db.order_games, { 
    foreignKey: 'gameId',
});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;