import express from "express"
import { createBrand, fetchAllBrands } from "../controllers/brandController.js";
const brandRouter = express.Router();
brandRouter.get('/',fetchAllBrands).post('/',createBrand);
export default  brandRouter; 