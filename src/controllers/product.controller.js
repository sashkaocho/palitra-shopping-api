import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (req, res) => {
  try {
    const existingCartItem = await Cart.findOne({ product_id: req.params.id });

    if (existingCartItem) {
      return res
        .status(400)
        .json({ error: "Cart item with this product already exists" });
    }

    const cartItem = await Cart.create(req.body);

    res.status(200).json(cartItem);
  } catch (err) {
    console.log(err);
  }
};
