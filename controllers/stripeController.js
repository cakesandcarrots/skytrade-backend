import Stripe from "stripe";
import dotenv from "dotenv"

dotenv.config()
const stripe = new Stripe( process.env.STRIPE_TEST_SECRET_API);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export const createPaymentIntent =  async (req, res) => {
    const { totalAmount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "usd",
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }

