import { Lateral } from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { Checkbox, Spinner, Card, Pagination } from 'flowbite-react'; // Reemplazamos Table por Card
import { useControles } from '../context/ControlesContext';
import { GoSearch } from 'react-icons/go';

function ListadoControles() {
  const { controles, getControles } = useControles();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [filteredControles, setFilteredControles] = useState([]);
  const controlesPorPagina = 10;

  useEffect(() => {
    getControles()
      .then(() => setLoading(false))
      .catch((error) => console.error('Error al obtener los datos:', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = controles.filter((control) =>
      control.ID_Mascota?.Nombre.toLowerCase().includes(
        inputValue.toLowerCase()
      )
    );
    setFilteredControles(filtered);
    setCurrentPage(1);
  }, [controles, inputValue]);

  if (loading) {
    return (
      <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 items-center">
        <div className="grid w-full justify-items-center scale-150">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  }

  const controlesToDisplay = inputValue ? filteredControles : controles;

  const indexOfLastControl = currentPage * controlesPorPagina;
  const indexOfFirstControl = indexOfLastControl - controlesPorPagina;
  const controlesActuales = controlesToDisplay.slice(
    indexOfFirstControl,
    indexOfLastControl
  );

  return (
    <>
      <div className="flex h-full">
        <Lateral />
        <div className="flex items-center flex-grow flex-col justify-start p-4 bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Proximos Controles
          </h1>
          <div className="flex flex-col mt-8">
            <div className="flex justify-center items-center mb-4">
              <input
                className="w-44 h-8 px-2 border border-gray-400 rounded focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Buscar"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-h-full overflow-y-auto shadow-inner">
              {/* Iteramos sobre los controles actuales y los mostramos como tarjetas */}
              {controlesActuales.map((control, index) => (
                <Card key={index} className="mb-4 bg-blue-300">
                  <div className="flex justify-between">
                    <div>
                      <Checkbox />
                      <span className="ml-2">{control.ID_Mascota.Nombre}</span>
                    </div>
                    <div>
                      <span>{formatDate(control.Fecha)}</span>
                      <span className="ml-2">{formatHour(control.Fecha)}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span>{control.ID_Mascota?.Rut_Tutor?.Nombre}</span>
                    <a
                      href="#"
                      className="ml-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </a>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                layout="pagination"
                currentPage={currentPage}
                totalPages={Math.ceil(
                  controlesToDisplay.length / controlesPorPagina
                )}
                previousLabel="Anterior"
                nextLabel="Siguiente"
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListadoControles;

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatHour(dateString) {
  const date = new Date(dateString);
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hour}:${minutes}`;
}
