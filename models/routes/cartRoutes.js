const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// GET user cart
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
  res.json(cart);
});

// ADD item to cart
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
  } else {
    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) item.quantity += 1;
    else cart.items.push({ productId, quantity: 1 });
  }

  await cart.save();
  res.json(cart);
});

// REMOVE item
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  const cart = await Cart.findOne({ userId });

  cart.items = cart.items.filter(i => i.productId.toString() !== productId);
  await cart.save();

  res.json(cart);
});

module.exports = router;
