import Mascota from '../models/mascotas.model.js';

export const getMascotas = async (req, res) => {
  try {
    const controles = await Mascota.find({}).populate('Rut_Tutor');
    res.status(200).json({ controles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMascotasId = async (req, res) => {
  try {
    const { id } = req.params;
    const controles = await control.findById({ id }).populate({
      path: 'ID_Mascota',
      populate: {
        path: 'Rut_Tutor',
        model: 'Tutor',
      },
    });
    res.status(200).json({ controles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
