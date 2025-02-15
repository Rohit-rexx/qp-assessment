const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");
const { Item } = require("./Item");

const Category = sequelize.define('Category', {
  categoryId: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Category.hasMany(Item, { foreignKey: "categoryId" });
Item.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = { Category };