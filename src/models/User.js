const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");
const { Order } = require("./Order");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  roles: {
    type: DataTypes.ENUM("user", "admin"),
    allowNull: false
  }
}, {
  tableName: "users",
  timestamps: false,
});

User.hasMany(Order, { foreignKey: "userid" });
Order.belongsTo(User, { foreignKey: "userid" });

module.exports = { User };

