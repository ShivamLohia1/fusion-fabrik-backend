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

module.exports = router;
