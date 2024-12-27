import express from "express"
import { addToCart, deleteFromCart, fetchCartByUser, updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post('/',addToCart).get("/",fetchCartByUser)
cartRouter.delete('/:id',deleteFromCart).patch('/:id',updateCart)

export default cartRouter