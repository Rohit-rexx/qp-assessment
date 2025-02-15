const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { connectionDB, sequelize } = require("./util/db");

const user_routes = require("./routes/user");
const item_router = require("./routes/item");
const category_router = require("./routes/category");
const order_router = require("./routes/order");

connectionDB();
sequelize.sync({alter: true})
    .then(() => console.log("✅ Table Created"))
    .catch((err) => console.error("❌ Error Creating Table:", err));




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/user", user_routes);
app.use("/item", item_router);
app.use("/category", category_router);
app.use("/order", order_router);


app.listen(process.env.PORT, async (req, res) => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});