import { useForm } from "react-hook-form";
import { registerRequest } from '../api/registroDatos';

function IngresoPage() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(async (values) => {
      console.log(values);
      const res = await registerRequest(values);
      console.log(res);
    })} className="max-w-screen-lg mx-auto mt-8 p-4 border border-gray-300 rounded">

      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Formulario de ingreso</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Datos tutor</h2>

          <label htmlFor="RUT">RUT:</label>
          <input type="number" {...register("rut", { required: true })} className="w-full border p-2 mb-2" />

          <label htmlFor="nombreTutor">Nombre:</label>
          <input type="text" {...register("nombreTutor", { required: true })} className="w-full border p-2 mb-2" />

          <label htmlFor="correo">Correo:</label>
          <input type="email" {...register("correo", { required: true })} className="w-full border p-2 mb-2" />

          <label htmlFor="celular">Celular:</label>
          <input type="number" {...register("celular", { required: true })} className="w-full border p-2 mb-2" />

          <label htmlFor="direccion">Dirección:</label>
          <input type="text" {...register("direccion", { required: true })} className="w-full border p-2 mb-2" />
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Datos mascota</h2>

          <label htmlFor="rutChip">RUT o Chip:</label>
          <input type="number" {...register("rutChip", { required: true })} className="w-full border p-2 mb-2" />

          <label htmlFor="nombreMascota">Nombre:</label>
          <input type="text" {...register("nombreMascota", { required: true })} className="w-full border p-2 mb-2" />

          <label htmlFor="especie">Especie:</label>
          <select {...register("especie", { required: true })} className="w-full border p-2 mb-2">
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="ave">Ave</option>
            <option value="roedor">Roedor</option>
            <option value="iguana">Iguana</option>
          </select>

          <label htmlFor="raza">Raza:</label>
          <input type="text" {...register("raza")} className="w-full border p-2 mb-2" />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Síntomas/Observaciones</h2>
        <textarea {...register("comentarios")} className="w-full border p-2 mb-2"></textarea>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Registrar</button>
    </form>
  );
}

export default IngresoPage;
