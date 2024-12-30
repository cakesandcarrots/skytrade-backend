import express from "express";
import { createProduct, fetchProductById, fetchProductsByFilters, insertData, updateProductById } from "../controllers/productController.js";
const productRouter = express.Router();
productRouter.get('/',fetchProductsByFilters).post('/',createProduct)
productRouter.get('/:id',fetchProductById)
productRouter.patch('/:id',updateProductById)
productRouter.post('/all',insertData)
export default productRouter 