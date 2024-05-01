import express from "express";
import {
  changeCartItemQuantity,
  getCart,
  removeProductFromCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.route("/cart").get(getCart);

cartRouter
  .route("/cart/:id")
  .patch(changeCartItemQuantity)
  .delete(removeProductFromCart);

export default cartRouter;
