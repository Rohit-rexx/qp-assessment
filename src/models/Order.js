const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const Order = sequelize.define('Order', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userid:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Completed", "Cancelled"),
    allowNull: false,
  },
  orderAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = { Order };