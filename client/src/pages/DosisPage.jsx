import { useState } from 'react';
import { Lateral } from '../components/Sidebar';

function DosisPage() {
  const [medicamento, setMedicamento] = useState('');
  const [pesoAnimal, setPesoAnimal] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularDosis = () => {
    // Tabla de dosificación por peso para diferentes medicamentos (ejemplo)
    const dosisPorPeso = {
      Medicamento1: {
        '1-5kg': '5mg',
        '5-10kg': '10mg',
        '10-20kg': '15mg',
        '20kg+': '20mg',
      },
      Medicamento2: {
        '1-5kg': '2mg',
        '5-10kg': '5mg',
        '10-20kg': '10mg',
        '20kg+': '15mg',
      },
      // Puedes agregar más medicamentos y dosis según sea necesario
    };

    // Verificar si el medicamento está en la tabla de dosificación
    if (!dosisPorPeso.hasOwnProperty(medicamento)) {
      setResultado('Medicamento no encontrado');
      return;
    }

    // Determinar la dosis basada en el peso del animal
    let dosis;
    if (pesoAnimal <= 5) {
      dosis = dosisPorPeso[medicamento]['1-5kg'];
    } else if (pesoAnimal <= 10) {
      dosis = dosisPorPeso[medicamento]['5-10kg'];
    } else if (pesoAnimal <= 20) {
      dosis = dosisPorPeso[medicamento]['10-20kg'];
    } else {
      dosis = dosisPorPeso[medicamento]['20kg+'];
    }

    setResultado(
      `La dosis de ${medicamento} para un animal de ${pesoAnimal} kg es: ${dosis}. Se administra cada ${frecuencia} horas.`
    );
  };

  return (
    <div
      className="flex w-full h-full items-center bg-gray-100"
      id="main-content">
      {/* Menú */}
      <Lateral />
      <div className="flex flex-grow flex-col justify-start p-4 w-full h-full items-center dark:bg-cyan-800">
        <h1
          className="dark:text-gray-300 font-robot text-3xl font-bold my-10"
          id="tit-form-ing">
          Calcular Dosis
        </h1>
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-600 dark:text-white">
          <div className="mb-4">
            <label className="block mb-2" htmlFor="medicamento">
              Medicamento:
            </label>
            <select
              id="medicamento"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700"
              value={medicamento}
              onChange={(e) => setMedicamento(e.target.value)}>
              <option value="">Selecciona un medicamento</option>
              <option value="Medicamento1">Medicamento 1</option>
              <option value="Medicamento2">Medicamento 2</option>
              {/* Puedes agregar más opciones según sea necesario */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="pesoAnimal">
              Peso del animal (kg):
            </label>
            <input
              type="number"
              id="pesoAnimal"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              value={pesoAnimal}
              onChange={(e) => setPesoAnimal(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="frecuencia">
              Frecuencia de administración (horas):
            </label>
            <input
              type="number"
              id="frecuencia"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              value={frecuencia}
              onChange={(e) => setFrecuencia(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
            onClick={calcularDosis}>
            Calcular Dosis
          </button>
          {resultado && <p className="mt-4">Resultado: {resultado}</p>}
        </div>
      </div>
    </div>
  );
}

export default DosisPage;
