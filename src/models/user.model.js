import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  RutUsuario: {
    type: String,
    required: true,
  },
  Nombre: {
      type: String,
      required: true,
  },
});

export default mongoose.model("Usuario", UsuarioSchema);
