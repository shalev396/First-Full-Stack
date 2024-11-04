import express from "express";
//util js file
import util from "../utils/util.js";
//middleware
import { validateProducts } from "../middleware/validator.js";
//db
import Product from "../db_(model)/mongoDB/product.js";

const router = express.Router();
router.get("/", validateProducts, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", validateProducts, getProduct, (req, res) => {
  res.json(res.Product);
});

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.product = Product;
  next();
}

router.post("/", validateProducts, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", validateProducts, getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.inStock != null) {
    res.product.inStock = req.body.inStock;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", validateProducts, getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: "Deleted Joke" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
