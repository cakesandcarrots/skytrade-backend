import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/productRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import brandRouter from "./routes/brandRouter.js";
import cors from "cors"
const server = express();

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/skytrade");
  console.log("Database Connected Sucessfully");
} catch (error) {
  console.log(error);
}

server.listen(3000, () => {
  console.log("server started");
});
server.use(express.json());
server.use(cors());

server.use("/products", productRouter);
server.use("/categories",categoryRouter)
server.use("/brands",brandRouter)