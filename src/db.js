import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/Vetdb");
    console.log(">>>> CONECTADO A LA DB");
  } catch (error) {
    console.log(error);
  }
};
