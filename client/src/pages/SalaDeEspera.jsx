import { useState, useEffect } from 'react';
import { filtroDatos, getMascota, getTutor } from '../api/salaEspera';
import { useDatosM } from '../context/DatosMedicos';

function SalaDeEspera() {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState(null);
  const { obtenerDatosM, DatosM } = useDatosM();

  useEffect(() => {
    obtenerDatosM();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltro = (filtroSeleccionado) => {
    setFiltro(filtroSeleccionado);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await filtroDatos(filtro);
        setDatos(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [filtro]);

  return (
    <div className="overflow-x-auto">
      <div className="text-center m-8">
        <h1 className="text-2xl font-bold" id="tit-form-ing">
          Sala de Espera
        </h1>
      </div>
      <div className="flex justify-end items-center bg-gray-200 p-4">
        <div className="flex space-x-4">
          <button className="filter-btn" onClick={() => handleFiltro('espera')}>
            <img src="/img/reloj.png" alt="Icono en espera" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('ingresado')}>
            <img src="/img/!.png" alt="Icono ingresado" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('finalizado')}>
            <img src="/img/check.png" alt="Icono finzalizado" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('anulado')}>
            <img src="/img/x.png" alt="Icono anulado" />
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Tutor</th>
            <th className="py-2 px-4 border-b">Mascota</th>
            <th className="py-2 px-4 border-b">Hora</th>
            <th className="py-2 px-4 border-b">Estado</th>
          </tr>
        </thead>
        <tbody>
          {/* {console.log(datos)} */}
          {DatosM.map((fila) => (
            <tr key={fila._id}>
              <td className="py-2 px-4 border-b">{fila._id}</td>
              <td className="py-2 px-4 border-b">
                {/* {console.log(await getTutor(fila.ID_Tutor))} */}
              </td>
              <td className="py-2 px-4 border-b">{fila.ID_Mascota}</td>
              <td className="py-2 px-4 border-b">{fila.Fecha}</td>
              <td className="py-2 px-4 border-b">{fila.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalaDeEspera;
