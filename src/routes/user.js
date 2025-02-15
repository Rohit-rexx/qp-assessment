const {User} = require("../models/User");
const user_router = require("express").Router();
const bcrypt = require("bcrypt");
const { generateToken, authenticateUser, authorizeRoles } = require("../util/jwt");

user_router.get("/", authenticateUser, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const user = await User.findAll();
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

user_router.post("/register", async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await User.create({ 
      name, 
      email, 
      password: hash, 
      roles 
    });
    return res.status(201).json({ message: "User registered successfully !"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

user_router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email
      }
    });

    if(!user){
      return res.status(404).json({
        error: "User not found",
      });
    }

    const compare = await bcrypt.compare(password, user.password);

    if(!compare){
      return res.status(401).json({message: "Invalida Credentials"});
    }

    const token = generateToken(user);

    return res.status(201).json({ message: "User Logged in successfully", token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

user_router.delete("/:id", authenticateUser, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if(!user){
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.destroy();
    return res.status(200).json({ message: "User deleted successfully"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


module.exports = user_router;