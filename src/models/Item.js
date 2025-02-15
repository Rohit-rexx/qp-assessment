const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const Item = sequelize.define('Item', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inventory: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});


module.exports = { Item };