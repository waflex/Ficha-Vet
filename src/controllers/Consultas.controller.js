import Ficha from '../models/Ficha.model.js';
import Tutor from '../models/tutor.model.js';
import Mascota from '../models/mascotas.model.js';

export const crearFicha = async (req, res) => {
  try {
    console.log(req.body);
    const {
      celular,
      comentarios,
      correo,
      direccion,
      especie,
      nombreMascota,
      nombreTutor,
      raza,
      rut,
      rutChip,
      antecedentes,
      existenciaTutor,
      existenciaMascota,
    } = req.body;
    if (!existenciaTutor) {
      //verficar checkbox
      const newTutor = await CrearTutor(
        rut,
        nombreTutor,
        correo,
        celular,
        direccion
      );
    }
    if (!existenciaMascota) {
      const newPet = await CrearMascota(
        rutChip,
        nombreMascota,
        especie,
        raza,
        rut,
        antecedentes
      );
    }

    const newFicha = await subirFicha(comentarios, 'En Espera', rutChip, rut);
    res.json({ message: 'true' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const verFicha = async (req, res) => {};
export const mainfichaID = async (req, res) => {};
export const mainficha = async (req, res) => {};
export const filtro = async (req, res) => {};
export const borrarFicha = async (req, res) => {
  res.send(console.log('hola mundo'));
};
export const verFichaID = async (req, res) => {};




async function CrearTutor(rutTutor, Nombre, Correo, Celular, Direccion) {
  const newTutor = Tutor({
    rutTutor,
    Nombre,
    Correo,
    Celular,
    Direccion,
  });
  //return await newTutor.save();
}
async function CrearMascota(
  Rut_Ficha_Masc,
  Nombre,
  Especie,
  Raza,
  Rut_Tutor,
  Antencedentes
) {
  const masctot = Mascota({
    Rut_Ficha_Masc,
    Nombre,
    Especie,
    Raza,
    Rut_Tutor,
    Antencedentes,
  });
  console.log(Antencedentes);
  //return await Mascota.save();
}
async function subirFicha(Sintomas, Estado, ID_Mascota, ID_Tutor, ID_Usuario) {
  const ficha = Ficha({
    Sintomas,
    Estado,
    ID_Mascota,
    ID_Tutor,
    ID_Usuario,
  });
  //return await ficha.save();
}
