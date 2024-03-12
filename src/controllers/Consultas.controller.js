import Ficha from '../models/Ficha.model.js';
import Tutor from '../models/tutor.model.js';
import Mascota from '../models/mascotas.model.js';

export const crearFicha = async (req, res) => {
  try {
    let idtutor, idmascota;
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
      idtutor = newTutor._id;
    }
    if (!existenciaMascota) {
      const newPet = await CrearMascota(
        rutChip,
        nombreMascota,
        especie,
        raza,
        idtutor,
        antecedentes
      );
      idmascota = newPet._id;
    }

    const newFicha = await subirFicha(
      comentarios,
      'En Espera',
      idmascota,
      idtutor
    );
    res.json({ message: 'true' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const verFicha = async (req, res) => {
  const { chipMascota, idFicha } = req.body;
};
export const mainfichaID = async (req, res) => {
  const { id } = req.params;
  try {
    const Fichas = await Ficha.findById({ _id: id })
      .populate('ID_Mascota')
      .populate('ID_Tutor');
    return res.json({
      Fichas,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const mainficha = async (req, res) => {
  try {
    // Obtiene la fecha de hoy
    const today = new Date();
    // Establece la fecha de inicio de hoy a las 00:00:00
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    // Establece la fecha de fin de hoy a las 23:59:59
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59
    );

    const Fichas = await Ficha.find({
      // Busca fichas que tengan la fecha dentro del rango de hoy
      Fecha: { $gte: startOfToday, $lte: endOfToday },
    })
      .populate('ID_Mascota')
      .populate('ID_Tutor')
      .sort({ Fecha: -1 });
    return res.json({
      Fichas,
    });
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
  try {
    return await newTutor.save();
  } catch (error) {
    console.log(error);
  }
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
  try {
    return await mascota.save();
  } catch (error) {
    console.log(error);
  }
}

async function subirFicha(Sintomas, Estado, ID_Mascota, ID_Tutor, ID_Usuario) {
  const ficha = Ficha({
    Sintomas,
    Estado,
    ID_Mascota,
    ID_Tutor,
    ID_Usuario,
  });
  try {
    await ficha.save();
    return;
  } catch (error) {
    console.log(error);
  }
}
