import { useForm } from 'react-hook-form'; /* import { registerRequest } from '../api/registroDatos'; */

function FichaMedicaPage() {
  const { register /* handleSubmit */ } = useForm();

  return (
    <form
    /* onSubmit={handleSubmit(async (values) => { 
        console.log(values); 
        const res = await registerRequest(values); 
        console.log(res); 
      })} */
    >
      {/* Datos tutor */}
      <section className="m-8">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Ficha Médica</h1>
        </div>
        <h2 className="font-bold">Datos tutor:</h2>
        <div className="mb-3 flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
            <label htmlFor="RUT">RUT:</label>
            <input
              type="number"
              {...register('rut', { required: true })}
              className="w-full border p-2 mb-2"
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
            <label htmlFor="nombreTutor">Nombre:</label>
            <input
              type="text"
              {...register('nombreTutor', { required: true })}
              className="w-full border p-2 mb-2"
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              {...register('correo', { required: true })}
              className="w-full border p-2 mb-2"
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              {...register('direccion', { required: true })}
              className="w-full border p-2 mb-2"
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/5">
            <label htmlFor="celular">Celular:</label>
            <input
              type="number"
              {...register('celular', { required: true })}
              className="w-full border p-2 mb-2"
            />
          </div>
        </div>
      </section>
      {/* Datos Mascota */}
      <section className="m-8">
        <h2 className="font-bold">Datos mascota:</h2>
        <div className="mb-3 flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
            <label htmlFor="rutChip">RUT o Chip:</label>
            <input
              type="number"
              {...register('rutChip', { required: true })}
              className="w-full border p-2 mb-2"
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
            <label htmlFor="nombreMascota">Nombre:</label>
            <input
              type="text"
              {...register('nombreMascota', { required: true })}
              className="w-full border p-2 mb-2"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
            <label htmlFor="especie">Especie:</label>
            <select
              {...register('especie', { required: true })}
              className="w-full border p-2 mb-2">
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="ave">Ave</option>
              <option value="roedor">Roedor</option>
              <option value="iguana">Iguana</option>
            </select>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/5 pr-4">
            <label htmlFor="raza">Raza:</label>
            <input
              type="text"
              {...register('raza', { required: true })}
              className="w-full border p-2 mb-2"
            />
          </div>
        </div>
        <section className="">
          <h2 className="font-bold">Antecedentes:</h2>
          <div className="mb-3 flex flex-wrap"></div>{' '}
          <label className="font-bold" htmlFor="antcedentes">Antecedentes médicos:</label>
          <textarea
            type="number"
            {...register('antcedentes', { required: true })}
            className="w-full border p-2 mb-2"
          />
        </section>
      </section>
    </form>
  );
}

export default FichaMedicaPage;
