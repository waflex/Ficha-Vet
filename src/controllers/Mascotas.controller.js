import Mascota from '../models/mascotas.model.js';
import Tutor from '../models/tutor.model.js';
import FichaEg from '../models/FichaEg.model.js';

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

export const getTutores = async (req, res) => {
  try {
    const tutores = await Tutor.find({});
    res.status(200).json({ tutores });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFichas = async (req, res) => {
  const { id } = req.params;

  try {
    const fichas = await FichaEg.find({ ID_Mascota: id })
      .populate('ID_Mascota')
      .populate('ID_Ficha')
      .populate('ID_Usuario');
    res.status(200).json({ fichas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
