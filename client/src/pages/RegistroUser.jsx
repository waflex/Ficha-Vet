import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
function RegistroUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { regUser, IsAuthenticated, errors: regErrors } = useAuth();

  useEffect(() => {}, [IsAuthenticated]);
  const onSubmit = handleSubmit(async (values) => {
    regUser(values);
  });
  return (
    <div className="bg-zinc-800 max-w-m p-10 rounded-md">
      {regErrors.map((error, i) => (
        <div className="bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit} className="p-1">
        <label htmlFor="rutUsuario" className="text-white">
          Rut Usuario
        </label>
        <input
          type="text"
          {...register('rutUsuario', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Rut Usuario"
        />
        {errors.rutUsuario && (
          <p className="text-red-500">Debes ingresar un Rut</p>
        )}
        <label htmlFor="Nombre" className="text-white">
          Nombre Usuario
        </label>
        <input
          type="text"
          {...register('Nombre', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Nombre Usuario"
        />
        {errors.Nombre && (
          <p className="text-red-500">Debes ingresar un Nombre</p>
        )}
        <label htmlFor="TipoUsuario" className="text-white">
          Tipo de Usuario
        </label>
        <select
          defaultValue={'1'}
          {...register('TipoUsuario', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
          <option value="1">Administrador</option>
          <option value="2">Docente</option>
          <option value="3">Alumno</option>
        </select>
        {errors.TipoUsuario && (
          <p className="text-red-500">Debes seleccionar un Tipo de Usuario</p>
        )}
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
function onClick() {
  const sideBar = document.querySelector('.SideBar');
  sideBar.classList.toggle('show');
  const cel = document.querySelector('.cel');
  cel.classList.toggle('show');
}