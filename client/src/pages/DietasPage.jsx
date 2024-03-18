import { useState } from 'react';
import { Lateral } from '../components/Sidebar';

function DietasPage() {
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [nivelActividad, setNivelActividad] = useState('');
  const [necesidadesEspeciales, setNecesidadesEspeciales] = useState([]);
  const [dietaGenerada, setDietaGenerada] = useState(null);

  const generarDieta = () => {
    // Lógica para generar la dieta personalizada basada en los parámetros proporcionados
    // Esta es solo una implementación de ejemplo, la lógica real puede variar

    // Calcular la cantidad de alimento requerida
    const cantidadAlimento = peso * 0.02 * (parseInt(nivelActividad) + 1); // Ejemplo de fórmula, puede variar

    // Seleccionar tipos de alimentos y porciones según las necesidades especiales
    const tiposAlimentos = [];
    if (necesidadesEspeciales.includes('dieta_baja_calorias')) {
      tiposAlimentos.push('Alimento bajo en calorías');
    }
    if (necesidadesEspeciales.includes('alergias')) {
      tiposAlimentos.push('Alimento hipoalergénico');
    }
    // Agregar más tipos de alimentos según sea necesario

    // Componer la dieta personalizada
    const dietaPersonalizada = {
      cantidadAlimento,
      tiposAlimentos,
    };

    setDietaGenerada(dietaPersonalizada);
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
        <div className="max-w-md mx-auto p-6 overflow-y-auto bg-white rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Generador de Dietas</h2>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="peso">
              Peso del animal (kg):
            </label>
            <input
              type="number"
              id="peso"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="edad">
              Edad del animal (años):
            </label>
            <input
              type="number"
              id="edad"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="nivelActividad">
              Nivel de actividad:
            </label>
            <select
              id="nivelActividad"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={nivelActividad}
              onChange={(e) => setNivelActividad(e.target.value)}>
              <option value="">Selecciona el nivel de actividad</option>
              <option value="0">Bajo</option>
              <option value="1">Moderado</option>
              <option value="2">Alto</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Necesidades especiales:</label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  value="dieta_baja_calorias"
                  className="form-checkbox border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  checked={necesidadesEspeciales.includes(
                    'dieta_baja_calorias'
                  )}
                  onChange={(e) =>
                    setNecesidadesEspeciales(
                      e.target.checked
                        ? [...necesidadesEspeciales, e.target.value]
                        : necesidadesEspeciales.filter(
                            (item) => item !== e.target.value
                          )
                    )
                  }
                />
                <span className="ml-2">Dieta baja en calorías</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="alergias"
                  className="form-checkbox border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  checked={necesidadesEspeciales.includes('alergias')}
                  onChange={(e) =>
                    setNecesidadesEspeciales(
                      e.target.checked
                        ? [...necesidadesEspeciales, e.target.value]
                        : necesidadesEspeciales.filter(
                            (item) => item !== e.target.value
                          )
                    )
                  }
                />
                <span className="ml-2">Alergias</span>
              </label>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={generarDieta}>
            Generar Dieta
          </button>
          {dietaGenerada && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Dieta Personalizada:
              </h3>
              <p>
                <strong>Cantidad de alimento recomendada:</strong>{' '}
                {dietaGenerada.cantidadAlimento} gramos por día
              </p>
              <p>
                <strong>Tipos de alimentos recomendados:</strong>
              </p>
              <ul>
                {dietaGenerada.tiposAlimentos.map((tipo, index) => (
                  <li key={index}>{tipo}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DietasPage;
