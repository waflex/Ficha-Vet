import mongoose from 'mongoose';

const fichaSchema = new mongoose.Schema(
  {
    Fecha: {
      type: Date,
      default: Date.now,
    },
    Sintomas: {
      type: String,
      required: true,
    },
    Estado: {
      type: String,
    },
    ID_Mascota: {
      type: String,
      required:true,
    },
    ID_Tutor:{
      type:String,
    },
    ID_Usuario:{
      type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model('Ficha', fichaSchema);
