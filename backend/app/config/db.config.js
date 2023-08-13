require('dotenv').config();
// console.log(process.env)
module.exports = {
    HOST: "localhost",//process.env.HOST_NAME,
    USER: "root",//process.env.USER_NAME,
    PASSWORD: "kophin",//process.env.PASSWORD
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };