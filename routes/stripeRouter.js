import express from "express";
import { createPaymentIntent} from "../controllers/stripeController.js";

const StripeRouter = express.Router();

StripeRouter.post("/create-payment-intent", createPaymentIntent );

export default StripeRouter
