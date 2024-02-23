import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    rutUsuario: {
      type: String,
      required: true,
      unique: true,
    },
    Nombre: {
      type: String,
      required: true,
    },
    Contrasena: {
      type: String,
      required: true,
    },
    tipoUsuario: {
      type: String,
      required: true,
    },
    ultimaConexion: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", UsuarioSchema);
