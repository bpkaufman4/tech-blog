// import sequelize constructor
const Sequelize = require('sequelize');

// bring in dovenv
require('dotenv').config();

// create connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: PORT
});

module.exports = sequelize;