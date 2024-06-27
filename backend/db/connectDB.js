import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected ${(await conn).connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};
