const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");
const { Item } = require("./Item");
const { Order } = require("./Order");

const OrderItem = sequelize.define('OrderItem', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

Order.belongsToMany(Item, { through: OrderItem });
Item.belongsToMany(Order, { through: OrderItem });


module.exports = { OrderItem };