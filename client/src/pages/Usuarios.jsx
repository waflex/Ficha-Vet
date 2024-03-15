import { useEffect, useState } from 'react';
import { useUsers } from '../context/UsersContext';
import { Lateral } from '../components/Sidebar';
import { Button, Dropdown } from 'flowbite-react';
import { HiFilter, HiMenu } from 'react-icons/hi';
import ModificarUsuario from '../components/ModificarUsuario';
import { useAuth } from '../context/AuthContext';

import { HiAdjustments, HiCloudDownload, HiUserCircle } from 'react-icons/hi';

function Usuarios() {
  const [filtro, setFiltro] = useState(null);
  const { user } = useAuth();
  const handleFiltroQuit = () => {
    setFiltro(null);
  };
  const handleFiltroAdmin = () => {
    if (filtro === 'Administrador') {
      setFiltro(null);
    } else {
      setFiltro('Administrador');
    }
  };

  const handleFiltroDocente = () => {
    if (filtro === 'Docente') {
      setFiltro(null);
    } else {
      setFiltro('Docente');
    }
  };

  const handleFiltroAlumno = () => {
    if (filtro === 'Alumno') {
      setFiltro(null);
    } else {
      setFiltro('Alumno');
    }
  };
  
  const { users, getUsers } = useUsers();
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full h-full ">
      <Lateral />
      <div className="flex flex-grow flex-col justify-start p-4 dark:bg-slate-900">
        <div className="text-center mb-8">
          <button className="cel fixed top-5 left-5 right-0" onClick={onClick}>
            <HiMenu />
          </button>
          <h1 className="text-2xl font-bold dark:text-white" id="tit-form-ing">
            Usuarios
          </h1>
        </div>
        <div className="bg-gray-200 m-0 p-4 flex justify-end space-x-4 dark:bg-blue-300 rounded-lg">
          {filtro ? (
            <HiFilter onClick={handleFiltroQuit} className="hover:click" />
          ) : null}
          <Dropdown label="Filtros" dismissOnClick={true}>
            <Dropdown.Item onClick={handleFiltroAdmin}>Admin</Dropdown.Item>
            <Dropdown.Item onClick={handleFiltroDocente}>Docente</Dropdown.Item>
            <Dropdown.Item onClick={handleFiltroAlumno}>Alumno</Dropdown.Item>
          </Dropdown>
        </div>
        {/* Contenedor de las fichas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          {users.Usuarios &&
            users.Usuarios.filter((usuario) => {
              if (!filtro) return true;
              return verificarTipoUsuario(usuario.tipoUsuario) === filtro;
            }).map((fila) => (
              <div
                key={fila._id}
                className="relative card max-w-96 rounded-md p-2 hover:scale-105 duration-150 hover:z-40 ml-6">
                <div className="block min-h-64 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-h-80 min-w-56 max-h-90 max-w-96">
                  {/* Contenido de la ficha */}
                  <h6 className="font-normal text-gray-700 dark:text-gray-400">
                    Usuario:
                  </h6>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {fila.Nombre}
                  </h5>
                  <h6 className="font-normal text-gray-700 dark:text-gray-400">
                    Rut: {fila.rutUsuario}
                  </h6>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Ultima Conexion: {calcularTiempo(fila.ultimaConexion)}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Tipo Usuario: {verificarTipoUsuario(fila.tipoUsuario)}
                  </p>
                  <div className="absolute bottom-10 left-0 w-full flex justify-center space-x-4">
                    <Button.Group outline>
                      <ModificarUsuario
                        name={fila.Nombre}
                        id={fila._id}
                        rut={fila.rutUsuario}
                        Tipo={verificarTipoUsuario(fila.tipoUsuario)}
                      />
                      <Button color="gray">
                        <HiCloudDownload />
                        Eliminar
                      </Button>
                    </Button.Group>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Usuarios;

function calcularTiempo(fechaCompleta) {
  const fecha = new Date(fechaCompleta);
  const fechaBase = new Date('1900-01-01T00:00:00.000Z');
  const fechaActual = new Date();

  // Si la fecha es igual a la fecha base, devuelve "Nunca"
  if (fecha.getTime() === fechaBase.getTime()) {
    return 'Nunca';
  } else {
    // Calcula la diferencia de tiempo en milisegundos
    const diferencia = Math.abs(fecha.getTime() - fechaActual.getTime());
    // Convierte la diferencia de tiempo a minutos
    const minutos = Math.floor(diferencia / 60000);

    // Si la diferencia es menor a 60 minutos, devuelve la diferencia en minutos
    if (minutos < 60) {
      return `Hace ${minutos} minutos`;
    } else {
      // Si la diferencia es mayor o igual a 60 minutos, calcula las horas y los minutos
      const horas = Math.floor(minutos / 60);
      const minutosRestantes = minutos % 60;
      return `Hace ${horas} horas con ${minutosRestantes} minutos`;
    }
  }
}
function verificarTipoUsuario(tipoUsuario) {
  switch (tipoUsuario) {
    case '1':
      return 'Administrador';
    case '2':
      return 'Docente';
    case '3':
      return 'Alumno';
    default:
      return 'Tipo de usuario no válido';
  }
}
function onClick() {
  const sideBar = document.querySelector('.SideBar');
  sideBar.classList.toggle('show');
  const cel = document.querySelector('.cel');
  cel.classList.toggle('show');
}
