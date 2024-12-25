import express from "express";
import { createProduct, fetchProductById, fetchProductsByFilters, updateProductById } from "../controllers/productController.js";
const productRouter = express.Router();
productRouter.get('/',fetchProductsByFilters).post('/',createProduct)
productRouter.get('/:id',fetchProductById)
productRouter.patch('/:id',updateProductById)
export default productRouter 