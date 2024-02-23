import Tutor from "../models/tutor.model.js";
import Usuario from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { rutUsuario, Nombre, Contrasena, tipoUsuario } = req.body;
  try {
    const passwordHash = await bcrypt.hash(Contrasena, 10);
    const newUser = new Usuario({
      rutUsuario,
      Nombre,
      Contrasena: passwordHash,
      tipoUsuario,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved.rutUsuario });
    res.cookie("token", token);
    res.json({
      nombreUsuario: userSaved.Nombre,
      Contrasena: userSaved.Contrasena,
      tipoUsuario: userSaved.tipoUsuario,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { rutUsuario, Contrasena } = req.body;
  try {
    const userFound = await Usuario.findOne({ rutUsuario });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no Encontrado" });

    const isMatch = await bcrypt.compare(Contrasena, userFound.Contrasena);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña Incorrecta" });

    const token = await createAccessToken({ id: userFound.rutUsuario });
    Usuario.updateOne(userFound.rutUsuario, {
      ultimaConexion: Date.now(),
    });
    res.cookie("token", token);
    res.json({
      nombreUsuario: userFound.Nombre,
      Contrasena: userFound.Contrasena,
      tipoUsuario: userFound.tipoUsuario,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registrarTutor = async (req, res) => {
  const { rutTutor, Nombre, Correo, Celular, Direccion } = req.body;
  try {
    const newTutor = new Tutor({
      rutTutor,
      Nombre,
      Correo,
      Celular,
      Direccion,
    });
    const userSaved = await newTutor.save();
    res.json({
      nombreTutor: userSaved.Nombre,
      Correo: userSaved.Correo,
      rutTutor: userSaved.rutTutor,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const { id } = req.user.id;
  const userFound = await Usuario.findOne({ id });
  if (!userFound)
    return res.send(400).json({ message: "Usuario no Encontrado" });
  return res.json({
    rutUsuario: userFound.rutUsuario,
    nombre: userFound.Nombre,
    tipoUsuario: userFound.tipoUsuario,
  });
};
