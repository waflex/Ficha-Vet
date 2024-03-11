import mongoose, { Mongoose } from 'mongoose';
import { Password } from './config.js';

export const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost/Vetdb");

    await mongoose.connect(
      `mongodb+srv://Admin:${Password}@cluster0.uzikeqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('Connected');
  } catch (error) {
    console.log(error);
  }
};
