import Ficha from '../models/Ficha.model.js';
import Tutor from '../models/tutor.model.js';
import Mascota from '../models/mascotas.model.js';
import control from '../models/control.model.js';

export const crearFicha = async (req, res) => {
  try {
    let idtutor, idmascota, newRut;
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

    if (!rutChip) {
      newRut = await newID(rutChip);
      console.log(newRut);
    }

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
    } else {
      Tutor.findOne({ rutTutor: rut }).then((tutor) => {
        idtutor = tutor._id;
      });
    }
    if (!existenciaMascota) {
      console.log(newRut ? newRut : rutChip);
      const newPet = await CrearMascota(
        newRut ? newRut : rutChip,
        nombreMascota,
        especie,
        raza,
        idtutor,
        antecedentes
      );
      idmascota = newPet._id;
    } else {
      Mascota.findOne({ Rut_Ficha_Masc: rutChip }).then((mascota) => {
        idmascota = mascota._id;
      });
    }

    const newFicha = await subirFicha(
      comentarios,
      'En Espera',
      idmascota,
      idtutor
    );
    res.status(201).json(['Ficha creada']);
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
    if (!Fichas)
      return res
        .status(401)
        .json([
          'No encontrado',
          'No se encontro la ficha con el id proporcionado',
        ]);
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
      // Fecha: { $gte: startOfToday, $lte: endOfToday },
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

export const actualizarFichaEst = async (req, res) => {
  const { Estado, id } = req.body;
  try {
    const ficha = await Ficha.findByIdAndUpdate({ _id: id }, { Estado });
    if (!ficha)
      return res
        .status(401)
        .json([
          'No encontrado',
          'No se encontro la ficha con el id proporcionado',
        ]);
    return res.json(['Ficha Actualizada']);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarControlEst = async (req, res) => {
  const { Estado, id } = req.body;
  try {
    const control = await control.findByIdAndUpdate({ _id: id }, { Estado });
    if (!control)
      return res
        .status(401)
        .json([
          'No encontrado',
          'No se encontro el control con el id proporcionado',
        ]);
    return res.json(['Control Actualizado']);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarFicha = async (req, res) => {
  const { id } = req.params;
  try {
    const ficha = await Ficha.findByIdAndDelete({ _id: id });
    if (!ficha)
      return res
        .status(401)
        .json([
          'No encontrado',
          'No se encontro la ficha con el id proporcionado',
        ]);
    return res.json(['Ficha eliminada']);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearControl = async (req, res) => {
  try {
    const { date: Fecha, id } = req.body;
    const ficha = await Ficha.findById({ _id: id })
      .populate('ID_Mascota')
      .populate('ID_Tutor');
    const ID_Mascota = ficha.ID_Mascota._id;
    const newControl = control({ ID_Mascota, Fecha });
    await newControl.save();
    res.status(201).json(['Control Agendado']);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getControl = async (req, res) => {
  try {
    // const { id } = req.params;
    const controles = await control.find({}).populate({
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

async function newID(rutChip) {
  if (rutChip === '' || rutChip === undefined || rutChip === null) {
    let newRut = 'M00001';
    console.log('Verificando Rut');
    const existintRutM = await Mascota.findOne({ Rut_Ficha_Masc: rutChip });
    if (!existintRutM) {
      const lastRutM = await Mascota.findOne({
        Rut_Ficha_Masc: { $regex: /^M\d+$/ },
      }).sort({ Rut_Ficha_Masc: -1 });
      console.log(lastRutM);
      const lastId = lastRutM ? lastRutM.Rut_Ficha_Masc : 'M00001';
      console.log('Last ID', lastId);
      const nextId = lastId.replace(/\d+/, (match) => {
        const number = parseInt(match) + 1;
        return number.toString().padStart(match.length, '0');
      });
      console.log('Next ID', nextId);
      const newFichaId = nextId.replace(/^(\D+)(\d+)$/, 'M$2');
      console.log('New ID', newFichaId);
      return newFichaId;
    } else {
      return newRut;
    }
  }
}
