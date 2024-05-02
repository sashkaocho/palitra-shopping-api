import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = express();

const PORT = 3000;

app.use(express.static("public"));

app.use(express.json());
app.use(cors());

app.use(productRouter);
app.use(cartRouter);

mongoose
  .connect(
    "mongodb+srv://admin:Password1!@palitra-shop.lpkqpmf.mongodb.net/?retryWrites=true&w=majority&appName=palitra-shop",
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running");
    });
    console.log("connected to a database");
  })
  .catch((err) => {
    console.log(err);
  });
