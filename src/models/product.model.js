import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gallery: {
    type: Array,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
