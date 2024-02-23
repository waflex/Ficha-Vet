import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    rutTutor: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Nombre: {
      type: String,
      required: true,
    },
    Correo: {
      type: String,
      required: true,
    },
    Celular: {
      type: Number,
      default: Date.Now,
    },
    Direccion: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tutor", tutorSchema);
