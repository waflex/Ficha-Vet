import { useForm } from 'react-hook-form';
import { registroUser } from '../api/auth';

function RegistroUser() {
  const onSubmit = handleSubmit((values) => {
    console.log(values);
    registroUser(values);
  });
  const { register, handleSubmit } = useForm();
  return (
    <div className="bg-zinc-800 max-w-m p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register('Rut', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Rut Usuario"
        />
        <input
          type="text"
          {...register('Nombre', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Nombre Usuario"
        />
        <select
          defaultValue={'Tipo'}
          {...register('TipoUsuario')}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
          <option value="Tipo" disabled hidden>
            Tipo de Usuario
          </option>
          <option value="1">Administrador</option>
          <option value="2">Docente</option>
          <option value="3">Alumno</option>
        </select>
        <button
          type="submit"
          className="w-full bg-slate-700 text-white px-4 py-2 rounded-md my-2">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default RegistroUser;
