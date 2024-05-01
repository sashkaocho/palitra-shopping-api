import express from "express";
import {
  addToCart,
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts).post(createProduct);

productRouter.route("/products/:id").get(getProductById).post(addToCart);

export default productRouter;
