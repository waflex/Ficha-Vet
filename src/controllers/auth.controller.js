import Usuario from '../models/user.model.js';
import { createAccessToken } from '../libs/jwt.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
  const { rutUsuario, Nombre, TipoUsuario } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ rutUsuario });
    if (usuarioExistente) return res.status(400).json(['Usuario ya existe']);

    const passwordHash = await bcrypt.hash(rutUsuario, 10);
    const newUser = new Usuario({
      rutUsuario,
      Nombre,
      Contrasena: passwordHash,
      tipoUsuario: TipoUsuario,
    });
    const userSaved = await newUser.save();
    res.json({
      nombreUsuario: userSaved.Nombre,
      Contrasena: userSaved.Contrasena,
      tipoUsuario: userSaved.tipoUsuario,
      ultimaConexion: 'Nunca',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { rutUsuario, Contrasena } = req.body;
  try {
    const userFound = await Usuario.findOne({ rutUsuario });
    if (!userFound) return res.status(400).json(['Usuario no Encontrado']);

    const isMatch = await bcrypt.compare(Contrasena, userFound.Contrasena);

    if (!isMatch) return res.status(400).json(['Contraseña Incorrecta']);

    const token = await createAccessToken({ id: userFound._id });
    Usuario.updateOne(userFound.rutUsuario, {
      ultimaConexion: Date.now(),
    });
    res.cookie('token', token);
    res.json({
      Rut_Usuario: userFound.rutUsuario,
      nombreUsuario: userFound.Nombre,
      Contrasena: userFound.Contrasena,
      tipoUsuario: userFound.tipoUsuario,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const { id } = req.user.id;
  const userFound = await Usuario.findOne({ id });
  if (!userFound)
    return res.send(400).json({ message: 'Usuario no Encontrado' });
  return res.json({
    rutUsuario: userFound.rutUsuario,
    nombre: userFound.Nombre,
    tipoUsuario: userFound.tipoUsuario,
  });
};

export const verify = async (req, res) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: 'No Autorizado, No hay token' });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err)
      return res
        .status(401)
        .json({ message: 'No Autorizado, Error al validar' });
    const userFound = await Usuario.findOne({ _id: user.id });
    if (!userFound)
      return res
        .status(401)
        .json({ message: 'No Autorizado, Usuario No encontrado' });
    return res.json({
      rutUsuario: userFound.rutUsuario,
      Nombre: userFound.Nombre,
      TipoUsuario: userFound.tipoUsuario,
    });
  });
};
