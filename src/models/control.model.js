import mongoose from 'mongoose';

const controlSchema = new mongoose.Schema(
  {
    ID_Ficha: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ficha',
      required: true,
    },
    ID_Mascota: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true,
    },
    Fecha: {
      type: Date,
      required: true,
    },
    Estado: {
      type: String,
      default: 'Agendado',
    },
  },
  { timestamps: true }
);

export default mongoose.model('control', controlSchema);
