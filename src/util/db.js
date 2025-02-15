const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DB,
  logging: false,
  // dialectOptions: {
  //   options: {
  //     encrypt: true,
  //     trustServerCertificate: true
  //   }
  // }
});

async function connectionDB(){
  try {
    await sequelize.authenticate();
    console.log('connected to MY SQL');
  } catch (error) {
    console.log('Ooops! Database connection error', error);
  }
}

module.exports = { sequelize, connectionDB };