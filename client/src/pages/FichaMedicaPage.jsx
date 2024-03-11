import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import AgendarControlModal from '../components/AgendarControlModal';
import { obtenerDatos } from '../api/salaEspera'; //MODIFICAR LOCATION DE ACUERDO A LA API

function FichaMedicaPage() {
  const [datosTutor, setDatosTutor] = useState({});
  const [datosMascota, setDatosMascota] = useState({});
  const [idFicha, setIdFicha] = useState(null); //TRAER IDFICHA DESDE OTRA VISTA

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerDatos(idFicha);
        setDatosTutor(data);
        setDatosMascota(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [idFicha]);

  return (
    <div className="flex">
      {/* Menú */}
      <Sidebar />

      <div className="flex-grow p-6">
        {/* Datos tutor */}
        <section className="m-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Ficha Médica</h1>
          </div>
          <h2 className="font-bold">Datos tutor:</h2>
          <div className="mb-3 flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
              <label htmlFor="RUT">RUT:</label>
              <input
                type="text"
                className="w-full border p-2 mb-2 custom-input"
                value={datosTutor.rut}
              />
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
              <label htmlFor="nombreTutor">Nombre:</label>
              <input
                type="text"
                className="w-full border p-2 mb-2 custom-input"
                value={datosTutor.nombre}
              />
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                className="w-full border p-2 mb-2 custom-input"
                value={datosTutor.correo}
              />
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                className="w-full border p-2 mb-2 custom-input"
                value={datosTutor.direccion}
              />
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5">
              <label htmlFor="celular">Celular:</label>
              <input
                type="number"
                className="w-full border p-2 mb-2 custom-input"
                value={datosTutor.celular}
              />
            </div>
          </div>
        </section>
        {/* Datos Mascota */}
        <section className="m-4">
          <h2 className="font-bold">Datos mascota:</h2>
          <div className="mb-3 flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/5 pr-4 place-items-start">
              <label htmlFor="rutChip">RUT o Chip:</label>
              <p>11111111111</p>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
              <label htmlFor="nombreMascota">Nombre:</label>
              <input
                type="text"
                className="w-full border p-2 mb-2 custom-input"
                value={datosMascota.nombreMascota}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
              <label htmlFor="especie">Especie:</label>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
              <label htmlFor="raza">Raza:</label>
              <p type="text" className="w-full border p-2 mb-2 custom-input">
                {datosMascota.raza}
              </p>
            </div>
          </div>
          <section className="mb-3 flex flex-wrap">
            <label className="font-bold" htmlFor="antecedentes">
              Antecedentes médicos:
            </label>
            <textarea
              type="text"
              className="w-full border p-2 mb-2 custom-input"
              value={datosMascota.antecedentes}
            />
          </section>

          <section className="">
            <div className="mb-3 flex flex-wrap">
              <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
                <label htmlFor="Peso">Peso:</label>
                <input
                  type="number"
                  // {...register('peso', { required: true })}
                  className="w-full border p-2 mb-2"
                />
              </div>
              <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
                <label htmlFor="tamaño">tamaño:</label>
                <input
                  type="number"
                  // {...register('tamaño', { required: true })}
                  className="w-full border p-2 mb-2"
                />
              </div>
              <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
                <label htmlFor="edad">Edad:</label>
                <input
                  type="number"
                  // {...register('edad', { required: true })}
                  className="w-full border p-2 mb-2 "
                />
              </div>
            </div>
            <div className="">
              <label className="font-bold" htmlFor="diagnostico">
                Diagnóstico
              </label>
              <textarea
                type="text"
                // {...register('diagnostico', { required: true })}
                className="w-full border p-2 mb-2 "
              />
            </div>
          </section>

          <div className="flex">
            {/* <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 mt-6  rounded">
              Registrar
            </button> */}
            <AgendarControlModal />
          </div>
        </section>
      </div>
    </div>
  );
}

export default FichaMedicaPage;
