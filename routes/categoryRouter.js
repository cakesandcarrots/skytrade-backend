import express from "express"
import { createCategory, fetchAllCategories } from "../controllers/categoryController.js";
const categoryRouter = express.Router();
categoryRouter.get('/',fetchAllCategories).post('/',createCategory)
export default  categoryRouter; 