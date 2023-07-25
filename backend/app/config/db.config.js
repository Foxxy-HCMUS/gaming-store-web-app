require('dotenv').config();
module.exports = {
    HOST: process.env.HOST_NAME,//"localhost",
    USER: process.env.USER_NAME,//"root",
    PASSWORD: process.env.PASSWORD,//"kophin",
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };