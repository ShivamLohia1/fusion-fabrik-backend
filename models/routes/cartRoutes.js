const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// GET cart items
router.get("/", async (req, res) => {
  const items = await Cart.find();
  res.json(items);
});

// ADD item to cart
router.post("/add", async (req, res) => {
  const item = new Cart(req.body);
  await item.save();
  res.json({ message: "Item added to cart" });
});

// DELETE item
router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

module.exports = router;
