const { Category } = require("../models/Category");
const { authenticateUser, authorizeRoles } = require("../util/jwt");
const category_router = require("express").Router();

category_router.get("/", async (req, res) => {
  try {
    const category = await Category.findAll();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

category_router.post("/add", authenticateUser, authorizeRoles(["admin"]), async(req, res) => {
  try {
    const { category } = req.body;
    const cat = await Category.create({ category });
    return res.status(201).json({ message: "Category created successfully", category: cat });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

category_router.delete("/:id", authorizeRoles(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if(!category){
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await category.destroy();
    return res.status(200).json({ message: "Category deleted successfully"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


module.exports = category_router;




