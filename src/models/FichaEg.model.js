import mongoose from 'mongoose';

const fichaEgSchema = new mongoose.Schema(
  {
    ID_Mascota: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota', // referencia a la colección Mascota
      required: true,
    },
    ID_Ficha: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ficha', // referencia a la colección Mascota
      required: true,
    },
    Peso: {
      type: String,
      required: true,
    },
    Tamano: {
      type: String,
      required: true,
    },
    Edad: {
      type: String,
      required: true,
    },
    ID_Usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario', // referencia a la colección Mascota
      required: true,
    },
    Diagnostico: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('FichaEg', fichaEgSchema);
