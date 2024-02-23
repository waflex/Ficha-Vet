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
  Contrasena:{
    type: String,
    required:true,
  }
  Fecha_creacion:{
    type:Date;
  }
});

export default mongoose.model("Usuario", UsuarioSchema);
