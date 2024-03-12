import Usuario from '../models/user.model.js';

export const getUsuarios = async (req, res) => {
  try {
    const Usuarios = await Usuario.find({})
      .populate('ID_Mascota')
      .populate('ID_Tutor');
    return res.json({
      Usuarios,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const UsuarioID = await Usuario.findById({ _id: id })
      .populate('ID_Mascota')
      .populate('ID_Tutor');
    return res.json({
      UsuarioID,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
