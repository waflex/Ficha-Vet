import { useState, useEffect } from 'react';
import { obtenerDatos } from '../api/salaEspera';

function SalaDeEspera() {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState(null);

  const handleFiltro = (filtroSeleccionado) => {
    console.log('Filtro seleccionado:', filtroSeleccionado);
    setFiltro(filtroSeleccionado);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerDatos(filtro);
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
          <button className="filter-btn" onClick={() => handleFiltro('anulado')}>
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
          {datos.map((fila) =>(
          <tr key={fila.id}>
            <td className="py-2 px-4 border-b">{fila.id}</td>
            <td className="py-2 px-4 border-b">{fila.tutor}</td>
            <td className="py-2 px-4 border-b">{fila.mascota}</td>
            <td className="py-2 px-4 border-b">{fila.hora}</td>
            <td className="py-2 px-4 border-b">{fila.estado}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalaDeEspera;
