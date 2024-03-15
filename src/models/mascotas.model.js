import mongoose from 'mongoose';

const mascotaSchema = new mongoose.Schema(
  {
    Rut_Ficha_Masc: {
      type: String,
      required: true,
      unique: true,
    },
    Nombre: {
      type: String,
      required: true,
    },
    Especie: {
      type: String,
      default: Date.now,
    },
    Raza: {
      type: String,
    },
    Antencedentes: {
      type: String,
      default: 'Sin Antecedentes',
    },
    Rut_Tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor', // referencia a la colección Tutor
    },
  },
  { timestamps: true }
);

export default mongoose.model('Mascota', mascotaSchema);
