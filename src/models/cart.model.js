import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
