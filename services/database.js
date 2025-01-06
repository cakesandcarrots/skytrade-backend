import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};

export default connectToDatabase;
