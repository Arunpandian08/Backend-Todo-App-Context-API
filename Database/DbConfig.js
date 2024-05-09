import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const mongoUrl = process.env.MONGODB_CONNECTION_URL;
  console.log("Connecting mongoDb...");
  try {
    const connection = await mongoose.connect(mongoUrl);
    console.log("MongoDb is connected");
    return connection;
  } catch (error) {
    console.log("Failed to connect MongoDB", error);
  }
};
export default connectDB;
