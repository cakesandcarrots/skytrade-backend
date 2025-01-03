import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/productRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import brandRouter from "./routes/brandRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "./models/userModel.js";
import bcrypt from "bcrypt";
import { cookieExtractor } from "./services/common.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import cookieParser from "cookie-parser";
import { isAuth } from "./services/common.js";
import Stripe from "stripe";
dotenv.config();



let opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;
const server = express();


try {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL);
  console.log("Database Connected Sucessfully");
} catch (error) {
  console.log(error);
}

server.listen(process.env.PORT, () => {
  console.log("server started");
});


const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
server.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      break;
    // ... handle other event types
    default:
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});
server.use(cookieParser());
server.use(passport.initialize());
server.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

server.use(passport.session());
server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const stripe = new Stripe( process.env.STRIPE_TEST_SECRET_API);

server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100),
    currency: "inr",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      try {
        const data = {email: `${email}`}
        const user = await userModel.findOne(data, "id email password");
        if (!user) {
          return done(null, false, {
            message: "No user exists with this email.",
          });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Invalid credentials." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await userModel.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);



passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log("Deserializing user ID:", user.id);
    return cb(null, user);
  });
});

server.use("/products", isAuth(), productRouter);
server.use("/categories", isAuth(), categoryRouter);
server.use("/brands", isAuth(), brandRouter);
server.use("/user", userRouter);
server.use("/auth", authRouter);
server.use("/cart", isAuth(), cartRouter);
server.use("/orders", isAuth(), orderRouter);


//mail endpoint

