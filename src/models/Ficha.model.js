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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota', // referencia a la colección Mascota
      required: true,
    },
    ID_Tutor:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor', // referencia a la colección Tutor
    },
    ID_Usuario:{
      type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model('Ficha', fichaSchema);
