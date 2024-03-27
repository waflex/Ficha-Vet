import { useEffect, useState } from 'react';
import { useMascotas } from '../context/MascotasContext'; // Importar el contexto de mascotas
import { useLocation } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import { Lateral } from '../components/Sidebar';
import { obtenerFichas } from '../api/Mascotas';
function MascotaDetallePage() {
  const { Mascotas, getMascotas } = useMascotas();
  const [Historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const queryParameters = useLocation().pathname.split('/').pop();

  const handleImpresion = () => {
    window.print();
  };
  const getFichas = async (data) => {
    try {
      const res = await obtenerFichas(data);
      setHistorial(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFichas(queryParameters);
    if (Historial) {
      setLoading(false);
    }
  }, [queryParameters]);
  /*/
_id: '65ef4ea976f104b474cae70f',
        Rut_Ficha_Masc: '12314123',
        Nombre: 'Cholo',
        Especie: 'perro',
        Raza: 'Kiltro',
        Antencedentes: 'Lituana',
        Rut_Tutor: {
          _id: '65ef4ea976f104b474cae70d',
          rutTutor: '55668899',
          Nombre: 'Miguel',
          Correo: 'Jorge@gmail.com',
          Celular: 12315415123,
          Direccion: 'Los palomos 123',
          createdAt: '2024-03-11T18:34:17.597Z',
          updatedAt: '2024-03-11T18:34:17.597Z',
          __v: 0
        },
        createdAt: '2024-03-11T18:34:17.678Z',
        updatedAt: '2024-03-11T18:34:17.678Z',
        __v: 0
      }*/
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
        <div className="grid text-slate-200 w-[calc(60vw-20vw)] p-4 m-4 border border-gray-300 rounded-lg justify-items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Historial Médico
          </h2>
          {Mascotas && Mascotas.controles ? (
            Mascotas.controles
              .filter((mascota) => mascota._id === queryParameters)
              .map((mascota) => (
                <div
                  key={mascota.id}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 uppercase text-gray-800 dark:text-gray-200">
                  <div className="grid-row">Nombre: 1 {mascota.Nombre}</div>
                  <div className="grid-row">
                    Rut o Chip: 5 {mascota.Rut_Ficha_Masc}
                  </div>
                  <div className="grid-row">
                    Nombre Tutor: 2 {mascota.Rut_Tutor?.Nombre}
                  </div>
                  <div className="grid-row">
                    Antecedentes: 3{' '}
                    {mascota.Antencedentes
                      ? mascota.Antencedentes
                      : 'Sin antecedentes'}
                  </div>
                  <div className="grid-row">Especie: 4 {mascota.Especie}</div>
                  <div className="grid-row">Raza: 5 {mascota.Raza}</div>
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
        <div className="flex">
          <Button className="bg-white" onClick={handleImpresion}>
            Imprimir
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MascotaDetallePage;
