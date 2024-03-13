import { useEffect } from 'react';
import { useUsers } from '../context/UsersContext';
import { Lateral } from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { FaClock, FaCheckCircle, FaTimesCircle, FaCheck } from 'react-icons/fa';

function Usuarios() {
  const { Usuarios, getUsers } = useUsers();
  useEffect(() => {
    getUsers();
    console.log(Usuarios);
  }, []);

  return (
    <div className="flex w-full h-full">
      <Lateral />
      <div className="flex flex-grow flex-col justify-start p-4 bg-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" id="tit-form-ing">
            Usuarios
          </h1>
        </div>
        <div className="bg-gray-200 m-0 p-4 flex justify-end space-x-4">
          Botones de Filtro
        </div>
        {/* Contenedor de las fichas */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          {DatosM.Fichas &&
            DatosM.Fichas.map((fila) => (
              <Link
                to={`/Ficha/${fila._id}`}
                key={fila._id}
                className="relative card max-w-96 rounded-md opacity-75 p-2 hover:scale-105 duration-150 ml-6">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  {/* Contenido de la ficha }
                  <h6 className="font-normal text-gray-700 dark:text-gray-400">
                    Nombre Paciente
                  </h6>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {fila.ID_Mascota.Nombre}
                  </h5>
                  <h6 className="font-normal text-gray-700 dark:text-gray-400">
                    Nombre Tutor: {fila.ID_Tutor.Nombre}
                  </h6>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Fecha: {hora(fila.Fecha)}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Estado: {fila.Estado}
                  </p>
                </div>
                {/* Icono de estado }
                {(() => {
                  switch (fila.Estado) {
                    case 'En Espera':
                      return (
                        <FaClock
                          className="absolute top-0 right-0 mr-2 mt-2 text-gray-500 opacity-50"
                          style={{
                            fontSize: '5em',
                            position: 'absolute',
                            zIndex: -1,
                          }}
                        />
                      );
                    case 'Atendido':
                      return (
                        <FaCheckCircle
                          className="absolute top-0 right-0 mr-2 mt-2 text-green-500 opacity-50"
                          style={{
                            fontSize: '5em',
                            position: 'absolute',
                            zIndex: -1,
                          }}
                        />
                      );
                    case 'Cancelado':
                      return (
                        <FaTimesCircle
                          className="absolute top-0 right-0 mr-2 mt-2 text-red-500 opacity-50"
                          style={{
                            fontSize: '5em',
                            position: 'absolute',
                            zIndex: -1,
                          }}
                        />
                      );
                    case 'Finalizado':
                      return (
                        <FaCheck
                          className="absolute top-0 right-0 mr-2 mt-2 text-blue-500 opacity-50"
                          style={{
                            fontSize: '5em',
                            position: 'absolute',
                            zIndex: -1,
                          }}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </Link>
            ))}
        </div> */}
      </div>
    </div>
  );
}

export default Usuarios;

function hora(fechaCompleta) {
  const fecha = new Date(fechaCompleta);
  return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
