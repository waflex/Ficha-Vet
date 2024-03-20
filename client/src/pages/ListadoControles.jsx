import { Lateral } from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { Checkbox, Spinner, Table } from 'flowbite-react';
import { useControles } from '../context/ControlesContext';

function ListadoControles() {
  const { controles, getControles } = useControles();
  const [loading, setLoading] = useState(true); //

  useEffect(() => {
    getControles()
      .then(() => setLoading(false))
      .catch((error) => console.error('Error al obtener los datos:', error));
    console.log(controles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return (
      <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 items-center">
        <div className="grid w-full justify-items-center scale-150">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex h-full">
        {/* Menú */}
        <Lateral />

        <div className="flex-grow p-6 max-h-full overflow-y-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox />
              </Table.HeadCell>
              <Table.HeadCell>Mascota</Table.HeadCell>
              <Table.HeadCell>Tutor</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
              <Table.HeadCell>Hora</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {controles && controles.length > 0 ? (
              <Table.Body className="divide-y">
                {controles &&
                  controles.map((control, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="p-4">
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {control.ID_Mascota?.Nombre}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {control.ID_Mascota?.Rut_Tutor?.Nombre}
                      </Table.Cell>
                      <Table.Cell>{formatDate(control.Fecha)}</Table.Cell>
                      <Table.Cell>{formatHour(control.Fecha)}</Table.Cell>
                      <Table.Cell>
                        <a
                          href="#"
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                          Edit
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            ) : (
              <Table.Body>
                <Table.Row>
                  <Table.Cell colSpan="6" className="p-4 text-center">
                    Sin resultados
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </div>
      </div>
    </>
  );
}

export default ListadoControles;

function formatDate(dateString) {
  // Crear un objeto Date a partir de la cadena de fecha
  const date = new Date(dateString);

  // Obtener el día, mes y año
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Formatear la fecha en el formato dd-mm-yyyy
  return `${day}-${month}-${year}`;
}
function formatHour(dateString) {
  // Crear un objeto Date a partir de la cadena de fecha
  const date = new Date(dateString);

  // Obtener la hora y minutos
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Formatear la fecha en el formato hh:mm
  return `${hour}:${minutes}`;
}
