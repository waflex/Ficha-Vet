import Tutor from "../models/tutor.model.js";
import Usuario from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { rutUsuario, Nombre, Contrasena, tipoUsuario } = req.body;
  try {
    const passwordHash = await bcrypt.hash(Contrasena, 10);
    const newUser = new Usuario({
      rutUsuario,
      Nombre,
      passwordHash,
      tipoUsuario,
    });
    await newUser.save();
    res.json({
      nombreUsuario: userSaved.Nombre,
      Correo: userSaved.Correo,
      rutTutor: userSaved.rutTutor,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = (req, res) => {
  console.log(req.body);
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
