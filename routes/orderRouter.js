import express from "express"
import { createOrder, fetchLoggedInUserOrders,fetchAllOrders } from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.get('/',fetchLoggedInUserOrders).post('/',createOrder)
orderRouter.get('/all',fetchAllOrders)

export default orderRouter