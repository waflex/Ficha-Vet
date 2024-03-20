import Usuario from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const getUsuarios = async (req, res) => {
  try {
    const Usuarios = await Usuario.find({});
    return res.json({
      Usuarios,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const UsuarioID = await Usuario.findById({ _id: id });
    return res.json({
      UsuarioID,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const UpdateUsuario = async (req, res) => {
  console.log(req.body, req.params); // Puedes ver los campos modificados aquí (si los hay
  const { id } = req.params;
  const modifiedData = req.body;
  console.log(id);
  if (!modifiedData) {
    return res.status(400).json({ message: 'No se han enviado datos' });
  }
  try {
    // Actualizar el usuario directamente en la base de datos
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      { _id: id },
      modifiedData,
      { new: true } // Esto devuelve el documento actualizado en lugar del documento antes de la actualización
    );
    console.log(usuarioActualizado);
    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json({ usuario: usuarioActualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};
export const cambiarContrasena = async (req, res) => {
  const { id } = req.params;
  const { rutUsuario } = req.body;
  console.log(req.body, req.params); // Puedes ver los campos modificados aquí (si los hay
  try {
    const usuario = await Usuario.findById({ _id: id });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const passwordHash = await bcrypt.hash(rutUsuario, 10);

    usuario.contrasena = passwordHash;
    console.log(usuario.contrasena);
    // await usuario.save();
    return res.json({ message: 'Contraseña actualizada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar contraseña' });
  }
};
