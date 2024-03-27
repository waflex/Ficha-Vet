import { useEffect } from 'react';
import { Lateral } from '../components/Sidebar';
import AgendarControlModal from '../components/AgendarControlModal';
import { useDatosM } from '../context/DatosMedicos';
import { useParams } from 'react-router-dom';
import { FloatingLabel, Textarea, Table, Spinner } from 'flowbite-react';
import { useAuth } from '../context/AuthContext';
import { FinalizarFicha } from '../api/salaEspera';

function FichaMedicaPage() {
  const { obtenerDatosFiltrados, DatosMFiltrados } = useDatosM();
  const { user } = useAuth();
  const { id } = useParams();
  console.log(id);
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
  const handleFinalizar = () => {
    const Peso = document.getElementById('Peso').value;
    const Tamaño = document.getElementById('Tamaño').value;
    const Edad = document.getElementById('Edad').value;
    const Diagnostico = document.getElementById('diagnostico').value;
    const { ID_Mascota, ID_Tutor } = DatosMFiltrados.Fichas;
    const { _id: Mascota } = ID_Mascota;
    const { _id: Tutor } = ID_Tutor;
    const { _id: Medico } = user;
    const data = {
      Peso,
      Tamaño,
      Edad,
      Diagnostico,
      Mascota,
      Tutor,
      Medico,
    };
    FinalizarFicha(data, id);
    alert('Consulta Finalizada');
    // window.location.href = '/SalaDeEspera';
  };
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
          <form onSubmit={handleFinalizar} method="post">
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
                  <Table.Cell>{ID_Mascota.Antecedentes}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Peso
                  </Table.Cell>
                  <Table.Cell>
                    <FloatingLabel variant="outlined" id="Peso" required />
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Tamaño
                  </Table.Cell>
                  <Table.Cell>
                    <FloatingLabel variant="outlined" id="Tamaño" required />
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Edad
                  </Table.Cell>
                  <Table.Cell>
                    <FloatingLabel variant="outlined" id="Edad" required />
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Diagnóstico
                  </Table.Cell>
                  <Table.Cell className="">
                    <Textarea
                      id="diagnostico"
                      required
                      rows={4}
                      itemID="Diagnostico"
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <div className="flex mt-5">
              <AgendarControlModal Mid={id} />
              <button
                className="ml-3 bg-green-400 rounded-md px-4 py-2 text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
                type="Submit">
                Finalizar Consulta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FichaMedicaPage;
