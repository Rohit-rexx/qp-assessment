const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models/User");
const { where } = require("sequelize");
dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    {expiresIn: "1hr"}
  );
}


const authenticateUser = (req, res, next) => {
  try {
    const token = req.header("Authorization") || "";
    if(!token){
      return res.status(401).json({ message: "Access Denied, Token not provided"});
    } 

    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message : "Invalid Token"});
  }
}


const authorizeRoles = (roles) => {
  return async (req, res, next) => {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if(!roles.includes(user.roles)){
      return res.status(403).json({error: "Forbidden: You do not have permission"});
    }

    next();
  }
}

module.exports = { generateToken, authenticateUser, authorizeRoles };