import { useEffect, useState } from 'react';
import { useMascotas } from '../context/MascotasContext'; // Importar el contexto de mascotas
import { useLocation } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { Lateral } from '../components/Sidebar';
function MascotaDetallePage() {
  const { Mascotas, getMascotas } = useMascotas();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMascotas()
      .then(() => setLoading(false))
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  const queryParameters = useLocation().pathname.split('/').pop();
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
        <div className="grid text-slate-200 w-full p-4 m-4 border border-gray-300 rounded-lg justify-items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Historial Médico
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Mascotas && Mascotas.controles ? (
              Mascotas.controles
                .filter((mascota) => mascota._id === queryParameters)
                .map((mascota) => (
                  <div key={mascota.id} className="p-4 uppercase">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      Nombre Mascota:{' '}
                      <span className="font-bold">{mascota.Nombre}</span>
                    </h3>
                    <div className="text-xl md:text-2xl">
                      <span className="block text-lg">
                        <b>Raza:</b> {mascota.Raza}
                      </span>
                      <span className="block text-lg">
                        <b>Especie:</b> {mascota.Especie}
                      </span>
                      <span className="block text-lg">
                        <b>Dueño:</b> {mascota.Rut_Tutor?.Nombre}
                      </span>
                      <span className="block text-lg">
                        <b>Fecha de Nacimiento:</b> {mascota.FechaNacimiento}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex flex-wrap gap-2 items-center justify-center">
                <div className="text-center">
                  Cargando...
                  <Spinner aria-label="Extra large spinner example" size="xl" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MascotaDetallePage;
