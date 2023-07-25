module.exports = {
    HOST: process.env.HOSTNAME,//"localhost",
    USER: process.env.USERNAME,//"root",
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