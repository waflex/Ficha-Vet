import { useState, useEffect } from 'react';
import { Lateral } from '../components/Sidebar';
import AgendarControlModal from '../components/AgendarControlModal';
import { useDatosM } from '../context/DatosMedicos';
import { useParams } from 'react-router-dom';

function FichaMedicaPage() {
  const { obtenerDatosFiltrados, DatosMFiltrados } = useDatosM();
  const { id } = useParams();
  const { Ficha } = DatosMFiltrados;
  useEffect(() => {
    obtenerDatosFiltrados(id);
  }, [id]);

  // Verificar si los datos han sido cargados antes de renderizar
  if (!DatosMFiltrados || !DatosMFiltrados.Fichas) {
    return <div>Cargando datos...</div>;
  }
  console.log(DatosMFiltrados.Fichas);
  // Extraer los datos del tutor y la mascota
  const { ID_Tutor, ID_Mascota } = DatosMFiltrados.Fichas;

  return (
    <div className="flex h-full">
      {/* Menú */}
      <Lateral />

      <div className="flex-grow p-6">
        {/* Datos tutor */}
        <section className="m-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Ficha Médica</h1>
          </div>
          <h2 className="font-bold">Datos tutor:</h2>
          <div className="mb-3 flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/5 ">
              <h5 htmlFor="RUT">RUT:</h5>
              <h6 className="w-full mb-3">{ID_Tutor.rutTutor}</h6>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5">
              <h5 htmlFor="nombreTutor">Nombre:</h5>
              <h6 className="w-full mb-3">{ID_Tutor.Nombre}</h6>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5">
              <h5 htmlFor="correo">Correo:</h5>
              <h6 className="w-full mb-3">{ID_Tutor.Correo}</h6>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5">
              <h5 htmlFor="direccion">Dirección:</h5>
              <h6 className="w-full mb-3">{ID_Tutor.Direccion}</h6>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5">
              <h5 htmlFor="celular">Celular:</h5>
              <h6 className="w-full mb-3">{ID_Tutor.Celular}</h6>
            </div>
          </div>
        </section>
        {/* Datos Mascota */}
        <section className="m-4">
          <h2 className="font-bold">Datos mascota:</h2>

          <div className="mb-3 flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/5 pr-4 place-items-start">
              <h5 htmlFor="rutChip">RUT o Chip:</h5>
              <h6>{ID_Mascota.Rut_Ficha_Masc}</h6>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5">
              <h5 htmlFor="nombreMascota">Nombre:</h5>
              <h6 className="w-full mb-3">{ID_Mascota.Nombre}</h6>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
              <h5 htmlFor="especie">Especie:</h5>
              <h6 className="w-full mb-3">{ID_Mascota.Especie}</h6>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
              <h5 htmlFor="raza">Raza:</h5>
              <h6 className="w-full mb-3">{ID_Mascota.Raza}</h6>
            </div>
          </div>

          <section className="mb-3 flex flex-wrap">
            <h5 className="font-bold" htmlFor="antecedentes">
              Antecedentes médicos:
            </h5>
            <h6 className="w-full mb-3">{ID_Mascota.Antencedentes}</h6>
          </section>

          <section className="">
            <div className="mb-3 flex flex-wrap">
              <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
                <h5 htmlFor="Peso">Peso:</h5>
                <input
                  type="number"
                  // {...register('peso', { required: true })}
                  className="w-full border p-2 mb-2"
                />
              </div>
              <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
                <h5 htmlFor="tamaño">tamaño:</h5>
                <input
                  type="number"
                  // {...register('tamaño', { required: true })}
                  className="w-full border p-2 mb-2"
                />
              </div>
              <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
                <h5 htmlFor="edad">Edad:</h5>
                <input
                  type="number"
                  // {...register('edad', { required: true })}
                  className="w-full border p-2 mb-2 "
                />
              </div>
            </div>
            <div className="">
              <h5 className="font-bold" htmlFor="diagnostico">
                Diagnóstico
              </h5>
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
