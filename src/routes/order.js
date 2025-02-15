const { Item } = require("../models/Item");
const { Order } = require("../models/Order");
const { OrderItem } = require("../models/OrderItem");
const { sequelize } = require("../util/db");
const { authenticateUser, authorizeRoles } = require("../util/jwt");

const order_router = require("express").Router();

order_router.get("/", authenticateUser, authorizeRoles(["admin", "user"]), async (req, res) => {
  try {
    return res.status(200).json({"order": "order"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


order_router.post("/create/:userid", authenticateUser, async (req, res) => {
  
  try {
    const { userid } = req.params;
    const { itemArray = [], totalAmount } = req.body;
    
    if(itemArray.length == 0 || !userid){
      return res.status(400).json({message: "Please provide inputs both items and userid!"})
    }

    const transaction = await sequelize.transaction();

    const idArray = itemArray.map((ia) => ia.id);

    const items = await Item.findAll({
      where: { id: idArray }
    });

    if(items.length != itemArray.length){
      return res.status(400).json({ message: "some item you are mentioned are not listed"})
    }

    for(let i = 0; i < items.length; i++){
      if(itemArray[i]?.quantity > items[i].inventory){
        throw new Error(`Not enough stock for ${items[i].name}`)
      }
    }

    const order = await Order.create({
      userid,
      totalAmount: totalAmount,
      status: "Pending",
    });

    await Promise.all(
      itemArray.map(async (item) => {
        await OrderItem.create({
          OrderId: order.id,
          ItemId: item?.id,
          quantity: item?.quantity
        });

        await Item.update(
          { inventory: sequelize.literal(`inventory - ${item?.quantity}`) },
          { where: { id: item?.id }, transaction } 
        );
      })
    )

    transaction.commit();

    return res.status(200).json({order});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



module.exports = order_router;