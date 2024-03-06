import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { logUser, errors: signError } = useAuth();
  const onSubmit = handleSubmit((data) => {
    logUser(data);
  });
  console.log(errors);
  return (
    <div className="flex h-[calc(100vh-100px)]  items-center justify-center ">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signError.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl text-white text-bold">Inicio de Sesion</h1>
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
          <label htmlFor="Contrasena" className="text-white">
            Contraseña
          </label>
          <input
            type="text"
            {...register('Contrasena', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.Contrasena && (
            <p className="text-red-500">Debes ingresar una Contraseña</p>
          )}

          <button
            type="submit"
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-md my-2">
            Iniciar Sesion
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
