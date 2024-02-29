import mongoose from 'mongoose';

const mascotaSchema = new mongoose.Schema(
  {
    Rut_Ficha_Masc: {
      type: String,
      required: true,
    },
    Nombre: {
      type: String,
      required:true,
    },
    Especie: {
      type: String,
      default: Date.now,
    },
    Raza:{
      type:String,
    },
    Antencedentes:{
      type:String
    },
    Rut_Tutor:{
        type:String
      }
  },
  { timestamps: true }
);

export default mongoose.model('Mascota', mascotaSchema);
