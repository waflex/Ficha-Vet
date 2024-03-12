import { useForm } from 'react-hook-form';
import { registroConsulta } from '../api/registroDatos';
import { Lateral } from '../components/Sidebar';

function IngresoPage() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="flex h-full">
      {/* Menú */}
      <Lateral />

      <div className="flex-grow p-4">
        <form
          onSubmit={handleSubmit(async (values) => {
            const res = await registroConsulta(values);
          })}
          className="mx-auto mt-0 p-2 border border-gray-300 rounded">
          <div className="text-center mb-0">
            <h1 className="text-2xl font-bold" id="tit-form-ing">
              Formulario de ingreso
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Datos tutor</h2>

              <label htmlFor="RUT">RUT:</label>
              <input
                type="checkbox"
                {...register('existenciaTutor')}
                defaultChecked={false}
                className="mr-2"></input>
              <input
                type="number"
                {...register('rut', { required: true })}
                className="w-full border p-2 mb-2"
              />

              <label htmlFor="nombreTutor">Nombre:</label>
              <input
                type="text"
                {...register('nombreTutor', { required: true })}
                className="w-full border p-2 mb-2"
              />

              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                {...register('correo', { required: true })}
                className="w-full border p-2 mb-2"
              />

              <label htmlFor="celular">Celular:</label>
              <input
                type="number"
                {...register('celular', { required: true })}
                className="w-full border p-2 mb-2"
              />

              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                {...register('direccion', { required: true })}
                className="w-full border p-2 mb-2"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Datos mascota</h2>

              <label htmlFor="rutChip">RUT o Chip:</label>
              <input
                type="checkbox"
                {...register('existenciaMascota')}
                defaultChecked={false}
                className="mr-2"></input>
              <input
                type="number"
                {...register('rutChip', { required: true })}
                className="w-full border p-2 mb-2"
              />

              <label htmlFor="nombreMascota">Nombre:</label>
              <input
                type="text"
                {...register('nombreMascota', { required: true })}
                className="w-full border p-2 mb-2"
              />

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

              <label htmlFor="">Raza:</label>
              <input
                type="text"
                {...register('raza')}
                className="w-full border p-2 mb-2"
              />

              <label htmlFor="antcedentes">Antecedentes:</label>
              <textarea
                {...register('antecedentes')}
                className="w-full border p-2 mb-2"></textarea>
            </div>
          </div>

          <div className="mt-0">
            <h2 className="text-xl font-bold mb-2">Síntomas/Observaciones</h2>
            <textarea
              {...register('comentarios')}
              className="w-full border p-2 mb-0"></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-2">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default IngresoPage;
