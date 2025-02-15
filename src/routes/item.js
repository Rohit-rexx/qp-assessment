const { Category } = require("../models/Category");
const {Item} = require("../models/Item");
const { authenticateUser, authorizeRoles } = require("../util/jwt");
const item_router = require("express").Router();

item_router.get("/", async (req, res) => {
  try {
    const item = await Item.findAll();
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

item_router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({
      where: {
        id,
      },
      include: Category
    });

    if(!item){
      return res.status(404).json({
        message: "Item not found",
      });
    }

    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

item_router.post("/add", authenticateUser, authorizeRoles(["admin"]), async(req, res) => {
  try {
    const { name, price, categoryId, inventory } = req.body;
    const item = await Item.create({ name, price, categoryId, inventory });
    return res.status(201).json({ message: "Item created successfully", item });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

item_router.delete("/:id", authenticateUser,  async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if(!item){
      return res.status(404).json({
        message: "Item not found",
      });
    }

    await item.destroy();
    return res.status(200).json({ message: "Item deleted successfully"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


item_router.patch("/:id", authenticateUser, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price } = req.body;

    const item = await Item.findByPk(id);

    if(!item){
      return res.status(404).json({
        message: "Item not found",
      });
    }

    await Item.update({
      name,
      price
    }, 
    {
      where: {
        id: id
      }
    }
    );

    return res.status(201).json({ message: "Item updated successfully"});
    
  } catch (error) {
    return res.status(400).json({error: error.message });
  }
})


module.exports = item_router;




