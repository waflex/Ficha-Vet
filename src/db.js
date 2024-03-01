import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/Vetdb");
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
};
