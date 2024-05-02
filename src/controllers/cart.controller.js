import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({});
    const productIds = cart.map((cartItem) => cartItem.product_id);
    const products = await Product.find({ _id: { $in: productIds } });

    const productsWithQuantities = cart.map((cartItem) => {
      const product = products.find((product) =>
        product._id.equals(cartItem.product_id),
      );
      return {
        ...product.toObject(),
        quantity: cartItem.quantity,
        cart_id: cartItem._id,
      };
    });

    res.json(productsWithQuantities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changeCartItemQuantity = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    switch (req.body.operation) {
      case "increment":
        cartItem.quantity += 1;
        break;
      case "decrement":
        if (cartItem.quantity === 1)
          return res
            .status(400)
            .json({ error: "Quantity cannot be less than 1" });
        cartItem.quantity -= 1;
        break;
      default:
        return res.status(400).json({ error: "Invalid operation" });
    }

    await cartItem.save();

    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(204);
  } catch (err) {
    console.log(err);
  }
};

export const emptyCart = async (req, res) => {
  try {
    const result = await Cart.deleteMany({});

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Cart emptied successfully" });
    } else {
      res.status(404).json({ message: "Cart is already empty" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
