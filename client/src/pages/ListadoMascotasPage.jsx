import { Lateral } from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { Spinner, Pagination } from 'flowbite-react';
import { useMascotas } from '../context/MascotasContext'; // Importar el contexto de mascotas
import { Link } from 'react-router-dom';

const ListadoMascotasPage = () => {
  const { Mascotas, getMascotas } = useMascotas();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [filteredMascotas, setFilteredMascotas] = useState([]);
  const mascotasPorPagina = 12;

  useEffect(() => {
    getMascotas()
      .then(() => setLoading(false))
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  useEffect(() => {
    if (Mascotas && Mascotas.controles) {
      const filtered = Mascotas.controles.filter((mascota) =>
        mascota.Nombre.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredMascotas(filtered);
    }
  }, [Mascotas, inputValue]);

  if (loading) {
    return (
      <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 items-center">
        <div className="grid w-full justify-items-center scale-150">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  }

  const indexOfLastMascota = currentPage * mascotasPorPagina;
  const indexOfFirstMascota = indexOfLastMascota - mascotasPorPagina;
  const mascotasActuales = filteredMascotas.slice(
    indexOfFirstMascota,
    indexOfLastMascota
  );

  return (
    <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 overflow-y-auto">
      <Lateral />
      <div className="flex items-center flex-grow flex-col justify-start p-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Listado de Mascotas
        </h1>
        <div className="flex flex-col mt-8">
          <div className="flex justify-center items-center mb-4">
            <input
              className="w-44 h-8 px-2 border border-gray-400 rounded focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Buscar mascota"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-h-full overflow-y-auto shadow-inner">
            {Mascotas &&
              mascotasActuales.map((mascota) => (
                <Link
                  onClick={() => {
                    console.log(mascota);
                  }}
                  key={mascota._id}
                  className="relative min-w-48 card max-w-96 rounded-md opacity-75 p-2 hover:scale-105 duration-150 ml-6">
                  <div className="block max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6">
                      <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {mascota.Nombre}
                      </h5>
                      <h6 className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                        Nombre Tutor: {mascota.Rut_Tutor?.Nombre}{' '}
                      </h6>
                      <h6 className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                        Raza: {mascota.Raza}
                      </h6>
                      <h6 className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                        Especie: {mascota.Especie}
                      </h6>
                      <p className="mt-2 text-sm font-thin text-gray-700 dark:text-gray-400">
                        Ver Próximo Control
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          {filteredMascotas.length > 0 ? (
            <div className="flex justify-center mt-4">
              <Pagination
                layout="pagination"
                currentPage={currentPage}
                totalPages={Math.ceil(
                  filteredMascotas.length / mascotasPorPagina
                )}
                previousLabel="Anterior"
                nextLabel="Siguiente"
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              No hay resultados
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListadoMascotasPage;
