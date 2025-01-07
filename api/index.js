import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import connectToDatabase from "../services/database.js";
import configurePassport from "../services/passport.js";
import productRouter from "../routes/productRouter.js"
import categoryRouter from "../routes/categoryRouter.js";
import brandRouter from "../routes/brandRouter.js";
import userRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";
import cartRouter from "../routes/cartRouter.js";
import orderRouter from "../routes/orderRouter.js";
import stripeRouter from "../routes/stripeRouter.js";
import { isAuth } from "../services/common.js";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

const server = express();
const stripe = new Stripe( process.env.STRIPE_TEST_SECRET_API);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
server.post("/webhook",express.raw({ type: "application/json" }),(request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      break;
    default:
  }

  response.json({received: true});
})


connectToDatabase();

configurePassport();

server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: "https://skytrade-sigma.vercel.app",
    credentials: true,
  })
);
server.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false, 
    cookie: {
      secure: true,
      sameSite: "None",
      httpOnly: true,
    },
  })
);

server.use(passport.initialize());
server.use(passport.session());


server.use("/products", isAuth(), productRouter);
server.use("/categories", isAuth(), categoryRouter);
server.use("/brands", isAuth(), brandRouter);
server.use("/user", userRouter);
server.use("/auth", authRouter);
server.use("/cart", isAuth(), cartRouter);
server.use("/orders", isAuth(), orderRouter);
server.use("/stripe", stripeRouter);


export default server;
