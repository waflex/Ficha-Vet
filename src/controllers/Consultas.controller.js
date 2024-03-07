import Ficha from '../models/Ficha.model.js';
import Tutor from '../models/tutor.model.js';
import Mascota from '../models/mascotas.model.js';

export const crearFicha = async (req, res) => {
  try {
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
export const verFicha = async (req, res) => {
  const { chipMascota, idFicha } = req.body;
};
export const mainfichaID = async (req, res) => {};
export const mainficha = async (req, res) => {
  try {
    const Fichas = await Ficha.find({})
      .populate('ID_Mascota')
      .populate('ID_Tutor');
    const fichasConNombres = Fichas.map((ficha) => ({
      ...ficha._doc,
      Nombre_Mascota: ficha.ID_Mascota.Nombre,
      Nombre_Tutor: ficha.ID_Tutor.Nombre,
    }));
    console.log(fichasConNombres);
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const filtro = async (req, res) => {};
export const borrarFicha = async (req, res) => {
  res.send(console.log('hola mundo'));
};
export const verFichaID = async (req, res) => {};

export const getMascota = async (req, res) => {
  try {
    const { id: Rut_Ficha_Masc } = req.params;
    const mascota = await Mascota.findOne({ Rut_Ficha_Masc });
    if (!mascota) return res.status(401).json({ message: 'No Autorizado' });
    return res.json({
      Nombre: mascota.Nombre,
    });
  } catch (error) {
    return res.status(500).json({ message: 'no encontrado' });
  }
};
export const getTutor = async (req, res) => {
  const { id: rutTutor } = req.params;
  try {
    const tutor = await Tutor.findOne({ rutTutor });
    if (!tutor) return res.status(401).json({ message: 'No Autorizado' });
    return res.json({
      Nombre: tutor.Nombre,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

async function CrearTutor(rutTutor, Nombre, Correo, Celular, Direccion) {
  const newTutor = Tutor({
    rutTutor,
    Nombre,
    Correo,
    Celular,
    Direccion,
  });
  return await newTutor.save();
}

async function CrearMascota(
  Rut_Ficha_Masc,
  Nombre,
  Especie,
  Raza,
  Rut_Tutor,
  Antencedentes
) {
  const mascota = Mascota({
    Rut_Ficha_Masc,
    Nombre,
    Especie,
    Raza,
    Rut_Tutor,
    Antencedentes,
  });
  return await mascota.save();
}

async function subirFicha(Sintomas, Estado, ID_Mascota, ID_Tutor, ID_Usuario) {
  const ficha = Ficha({
    Sintomas,
    Estado,
    ID_Mascota,
    ID_Tutor,
    ID_Usuario,
  });
  return await ficha.save();
}
