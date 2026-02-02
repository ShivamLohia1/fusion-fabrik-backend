const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// GET all cart items
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD item to cart
router.post("/", async (req, res) => {
  try {
    const newItem = new Cart(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
