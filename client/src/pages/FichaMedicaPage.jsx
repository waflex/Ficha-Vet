import { useForm } from 'react-hook-form';
// import { registerRequest } from '../api/registroDatos';

function FichaMedicaPage() {
  const { register, 
    // handleSubmit 
    } = useForm();

  return (
    <form
    //   onSubmit={handleSubmit(async (values) => {
    //     console.log(values);
    //     const res = await registerRequest(values);
    //     console.log(res);
    //   })}
    >
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Ficha Médica</h1>
      </div>
      <div htmlFor="">
        <label htmlFor="RUT">RUT:</label>
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

        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          {...register('direccion', { required: true })}
          className="w-full border p-2 mb-2"
        />
        <hr></hr>

        <label htmlFor="celular">Celular:</label>
        <input
          type="number"
          {...register('celular', { required: true })}
          className="w-full border p-2 mb-2"
        />
      </div>
      <form></form>

      <section>
        <div></div>
      </section>
    </form>
  );
}
export default FichaMedicaPage;
