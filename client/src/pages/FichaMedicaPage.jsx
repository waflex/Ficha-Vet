import { useState, useEffect } from 'react';
import { Lateral } from '../components/Sidebar';
import AgendarControlModal from '../components/AgendarControlModal';
import { useDatosM } from '../context/DatosMedicos';
import { useParams } from 'react-router-dom';
import { FloatingLabel, Textarea, Table, Spinner } from 'flowbite-react';
import { HiMenu } from 'react-icons/hi';

function FichaMedicaPage() {
  const { obtenerDatosFiltrados, DatosMFiltrados } = useDatosM();
  const { id } = useParams();
  const { Ficha } = DatosMFiltrados;
  useEffect(() => {
    obtenerDatosFiltrados(id);
  }, [id]);

  // Verificar si los datos han sido cargados antes de renderizar
  if (!DatosMFiltrados || !DatosMFiltrados.Fichas) {
    return (
      <div className="flex flex-wrap gap-2">
        <div className="text-center">
          Cargando...
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      </div>
    );
  }
  if (DatosMFiltrados.Fichas[0] == 'No encontrado') {
    alert('Valor No Encontrado');
    window.location.href = '/SalaDeEspera';
  }

  // Extraer los datos del tutor y la mascota
  const { ID_Tutor, ID_Mascota } = DatosMFiltrados.Fichas;

  return (
    <div className="flex h-full">
      {/* Menú */}
      <Lateral />

      <div className="flex-grow p-6 max-h-full overflow-y-auto">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-robot font-bold">Ficha Médica</h1>
        </div>

        <div>
          {/* Datos tutor */}
          <Table>
            <Table.Row>
              <Table.Head>
                <Table.HeadCell>Datos tutor</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
            </Table.Row>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  RUT
                </Table.Cell>
                <Table.Cell>{ID_Tutor.rutTutor}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Nombre
                </Table.Cell>
                <Table.Cell>{ID_Tutor.Nombre}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Correo
                </Table.Cell>
                <Table.Cell>{ID_Tutor.Correo}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Direccion
                </Table.Cell>
                <Table.Cell>{ID_Tutor.Direccion}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Celular
                </Table.Cell>
                <Table.Cell>{ID_Tutor.Celular}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Head>
                  <Table.HeadCell>Datos mascota</Table.HeadCell>
                  <Table.HeadCell></Table.HeadCell>
                </Table.Head>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  RUT o Chip
                </Table.Cell>
                <Table.Cell>{ID_Mascota.Rut_Ficha_Masc}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Nombre
                </Table.Cell>
                <Table.Cell>{ID_Mascota.Nombre}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Especie
                </Table.Cell>
                <Table.Cell>{ID_Mascota.Especie}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Raza
                </Table.Cell>
                <Table.Cell>{ID_Mascota.Raza}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Antecedentes
                </Table.Cell>
                <Table.Cell>{ID_Mascota.Antencedentes}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Peso
                </Table.Cell>
                <Table.Cell>
                  <FloatingLabel variant="outlined" />
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Tamaño
                </Table.Cell>
                <Table.Cell>
                  <FloatingLabel variant="outlined" />
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Edad
                </Table.Cell>
                <Table.Cell>
                  <FloatingLabel variant="outlined" />
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Diagnóstico
                </Table.Cell>
                <Table.Cell className="">
                  <Textarea id="diagnostico" required rows={4} />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <div className="flex mt-5">
          <AgendarControlModal />
        </div>
      </div>
    </div>
  );
}

export default FichaMedicaPage;
