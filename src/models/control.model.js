import mongoose from 'mongoose';

const controlSchema = new mongoose.Schema(
  {
    ID_Mascota: {
      type: String,
      required:true,
    },
    Fecha: {
      type: Date,
      required: true,
    },
    Estado: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('control', controlSchema);
