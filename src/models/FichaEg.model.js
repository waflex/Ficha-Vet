import mongoose from 'mongoose';

const fichaEgSchema = new mongoose.Schema(
  {
    ID_Mascota: {
      type: String,
      required:true
    },
    ID_Ficha: {
      type: String,
      required: true,
    },
    Estado: {
      type: String,
      required:true,
    },
    Fecha: {
      type: Date,
      default: Date.now,
    },
    Prox_Control:{
      type:Date,
    },
    ID_Usuario:{
      type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model('FichaEg', fichaEgSchema);
