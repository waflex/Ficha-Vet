import { Lateral } from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { Checkbox, Spinner, Card, Pagination } from 'flowbite-react'; // Reemplazamos Table por Card
import { BsTelephoneOutboundFill, BsWhatsapp } from 'react-icons/bs';
import { useControles } from '../context/ControlesContext';
import { useAuth } from '../context/AuthContext';
import { GoSearch } from 'react-icons/go';

function ListadoControles() {
  const { user } = useAuth();
  const { controles, getControles, cancelarControles, agendarControl } =
    useControles();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [filteredControles, setFilteredControles] = useState([]);
  const [selectedControls, setSelectedControls] = useState([]);
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

  const handleCheckboxChange = (id) => {
    setSelectedControls((prevState) => {
      const newSelectedControls = { ...prevState };
      newSelectedControls[id] = !prevState[id];
      return newSelectedControls;
    });
  };

  const handleDeleteSelected = () => {
    // Lógica para eliminar los controles seleccionados
    // Utiliza los índices de los controles seleccionados en selectedControls para eliminarlos del estado de controles o de la base de datos
  };
  const handleCancelSelected = () => {
    cancelarControles(selectedControls);
    window.location.reload();
  };
  const handleAgendar = (data) => {
    console.log(data);
    agendarControl(data);
    // Lógica para agendar los controles seleccionados
  };

  if (loading) {
    return (
      <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 items-center">
        <div className="grid w-full justify-items-center scale-150">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  }
  const areAnyControlsSelected = Object.values(selectedControls).some(
    (value) => value
  );

  const controlesToDisplay = inputValue ? filteredControles : controles;

  const indexOfLastControl = currentPage * controlesPorPagina;
  const indexOfFirstControl = indexOfLastControl - controlesPorPagina;
  const controlesActuales = controlesToDisplay?.slice(
    indexOfFirstControl,
    indexOfLastControl
  );

  return (
    <>
      <div className="flex h-full">
        <Lateral />
        <div className="flex items-center flex-grow flex-col justify-start p-4 bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Próximos Controles
          </h1>
          <div className="flex flex-col mt-8">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex flex-grow">
                {' '}
                {/* Modificación aquí */}
                <input
                  className="w-44 h-8 px-8 border border-gray-400 rounded focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Buscar"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <GoSearch className="text-gray-400" />
                </div>
              </div>
              <div
                className="flex"
                style={{ display: areAnyControlsSelected ? 'flex' : 'none' }}>
                <button
                  className={`px-3 py-1 text-sm mx-2 rounded ${
                    !areAnyControlsSelected
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-red-900'
                  }`}
                  onClick={handleCancelSelected}
                  disabled={!areAnyControlsSelected}>
                  Agendar seleccionados
                </button>
                <button
                  className={`px-3 py-1 text-sm mx-2 rounded ${
                    !areAnyControlsSelected
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-900'
                  }`}
                  onClick={handleCancelSelected}
                  disabled={!areAnyControlsSelected}>
                  Cancelar seleccionados
                </button>
                <button
                  className={`px-3 py-1 text-sm mx-2 rounded  ${
                    !areAnyControlsSelected
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-700 text-white hover:bg-red-900'
                  }`}
                  onClick={handleDeleteSelected}
                  disabled={!areAnyControlsSelected}>
                  Eliminar seleccionados
                </button>
                {/* Otros botones aquí */}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5 max-h-full overflow-y-auto shadow-inner">
              {/* Iteramos sobre los controles actuales y los mostramos como tarjetas */}
              {controlesActuales &&
                controlesActuales.length > 0 &&
                controlesActuales.map((control, index) => (
                  <Card
                    style={{
                      borderRadius: '16px',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(4.5px)',
                      WebkitBackdropFilter: 'blur(4.5px)',
                      border: '1px solid rgba(0, 169, 255, 0.55)',
                    }}
                    key={index}
                    className={`select-none mb-4 dark:text-gray-200 min-w-64 max-w-80 ${
                      control.Estado === 'Pendiente'
                        ? 'bg-blue-300 dark:bg-blue-800'
                        : control.Estado === 'Cancelado'
                        ? 'bg-red-400 dark:bg-amber-700'
                        : 'bg-green-300 dark:bg-green-600'
                    }`}>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2  pr-4">
                        <div
                          className={`text-xs rounded-md inline-flex items-center border border-gray-300 px-2 py-1 mr-2 ${
                            control.Estado === 'Agendado' ? 'hidden' : 'none'
                          }`}>
                          <span className="">Seleccionar</span>
                          <Checkbox
                            id={`${control._id}`}
                            checked={selectedControls[`${control._id}`]}
                            onChange={() =>
                              handleCheckboxChange(`${control._id}`)
                            }
                            value={false}
                            className="mt-1 mx-2"
                          />{' '}
                        </div>
                        <div className="mt-2">
                          <span className="text-xs">
                            Nombre:{`\n`}
                            <span className="font-bold text-lg">
                              {control.ID_Mascota.Nombre}
                            </span>
                          </span>
                        </div>
                        <div className="mt-2">
                          <span>
                            Nombre Tutor:{' '}
                            {control.ID_Mascota?.Rut_Tutor?.Nombre}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span>
                            Telefono: {control.ID_Mascota?.Rut_Tutor?.Celular}
                          </span>
                          <div className="flex my-2">
                            <a
                              href={`tel:${control.ID_Mascota?.Rut_Tutor?.Celular}`}
                              className="inline-flex mr-5"
                              target="_blank">
                              <BsTelephoneOutboundFill className="scale-150" />
                            </a>
                            <a
                              href={`https://wa.me/${control.ID_Mascota?.Rut_Tutor?.Celular}?text=Hola%20nos%20comunicamos%20desde%20el%20instituto%20Valle%20Central%20La%20Serena,%20para%20consultar%20si%20${control.ID_Mascota?.Nombre}%20va%20a%20venir%20hoy?`}
                              target="_blank">
                              <BsWhatsapp className="scale-150" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/2 pl-4">
                        <div>Fecha: {formatDate(control.Fecha)}</div>
                        <div className="mt-2">
                          Hora: {formatHour(control.Fecha)}
                        </div>
                        <div className="mt-2">
                          <span>Estado: {control.Estado}</span>
                          {/* Condicional para mostrar el ícono dependiendo del estado */}
                          {control.Estado === 'Pendiente' && (
                            <span className="text-red-500">
                              <img
                                src="/Pendiente_ico.svg"
                                alt="Cancelado"
                                className="absolute top-5 right-5 scale-300 -z-10 h-5 w-5 inline-block my-auto items-center"
                              />
                            </span>
                          )}
                          {control.Estado === 'Cancelado' && (
                            <span className="text-red-500">
                              <img
                                src="/cancel_ico.svg"
                                alt="Cancelado"
                                className="absolute top-5 right-5 scale-250 -z-10 h-5 w-5 inline-block my-auto items-center"
                              />
                            </span>
                          )}
                          {control.Estado === 'Agendado' && (
                            <span className="text-red-500">
                              <img
                                src="/Agendado_ico.svg"
                                alt="Cancelado"
                                className="absolute top-5 right-5 scale-250 -z-10 h-5 w-5 inline-block my-auto items-center"
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-full flex mt-2 justify-center ${
                        control.Estado === 'Agendado' ? 'hidden' : 'none'
                      }`}>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                        onClick={
                          control.Estado !== 'Agendado'
                            ? () => {
                                control.user = user;
                                handleAgendar(control);
                              }
                            : null
                        }>
                        Agendar
                      </button>
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
