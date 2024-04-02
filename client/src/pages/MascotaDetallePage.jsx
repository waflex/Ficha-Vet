import { useEffect, useState } from 'react';
import { useMascotas } from '../context/MascotasContext'; // Importar el contexto de mascotas
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import { Lateral } from '../components/Sidebar';
import { obtenerFichas } from '../api/Mascotas';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

function MascotaDetallePage() {
  const queryParameters = useParams();
  const { Mascotas, getMascotas } = useMascotas();
  const [Historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImpresion = () => {
    window.print();
  };
  const fetchData = async () => {
    try {
      setLoading(true); // Establece el estado de carga a verdadero antes de la llamada a la API
      const res = await obtenerFichas(queryParameters?.id);
      setHistorial(res.data?.fichas);
      setLoading(false); // Establece el estado de carga a falso después de obtener los datos
    } catch (error) {
      console.log(error);
      setLoading(false); // Asegúrate de manejar el estado de carga incluso si hay un error
    }
  };
  useEffect(() => {
    getMascotas(); // Llama a la función getMascotas del contexto de mascotas
    fetchData(); // Llama a la función fetchData al montar el componente o cuando queryParameters cambie
  }, [queryParameters]);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-2">
        <div className="text-center">
          Cargando...
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 overflow-y-auto">
      <Lateral />
      <div className="flex items-center flex-grow flex-col justify-start p-4 w-full">
        <div className="grid ">
          <div className="container mx-auto p-4 bg-teal-200 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Datos de la Mascota
            </h2>
            {Mascotas && Mascotas.controles ? (
              Mascotas.controles
                .filter((mascota) => mascota._id === queryParameters?.id)
                .map((mascota) => (
                  <div
                    key={mascota.id}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 uppercase text-gray-800">
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Nombre:</span>
                      <span>{mascota.Nombre}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Rut o Chip:</span>
                      <span>{mascota.Rut_Ficha_Masc}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Nombre Tutor:</span>
                      <span>{mascota.Rut_Tutor?.Nombre}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Antecedentes:</span>
                      <span>
                        {mascota.Antencedentes
                          ? mascota.Antencedentes
                          : 'Sin antecedentes'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Especie:</span>
                      <span>{mascota.Especie}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Raza:</span>
                      <span>{mascota.Raza}</span>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-600">Cargando...</p>
                <Spinner aria-label="Cargando" size="xl" />
              </div>
            )}
          </div>

          <div className="container">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Historial Clínico
            </h2>
            <div className="grid grid-cols-1  gap-4 uppercase my-5">
              {Historial.length > 0 ? (
                Historial.map((ficha) => (
                  <Link
                    to={''}
                    key={ficha._id}
                    className="bg-white dark:text-slate-200 dark:bg-gray-800 p-4 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                    <div className="grid-row">
                      Fecha: {formatearFecha(ficha.createdAt)}
                    </div>
                    <div className="grid-row">
                      Motivo: {ficha.ID_Ficha?.Sintomas}
                    </div>
                    <div className="grid-row">
                      Diagnóstico: {ficha.Diagnostico}
                    </div>
                    <div className="grid-row">
                      Veterinario Tratante: {ficha.ID_Usuario?.Nombre}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <HiOutlineInformationCircle className="scale-300" />
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    No hay registros :c
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex">
          <Button
            className="bg-cyan-500 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
            onClick={handleImpresion}>
            Imprimir
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MascotaDetallePage;

function formatearFecha(fecha) {
  const date = new Date(fecha);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
