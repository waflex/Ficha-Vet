import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/registroDatos';

function FichaMedicaPage() {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        console.log(values);
        const res = await registerRequest(values);
        console.log(res);
      })}>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Ficha Médica</h1>
      </div>

      <section>
        <div>
            
        </div>
      </section>
    </form>
  );
}
export default FichaMedicaPage;
