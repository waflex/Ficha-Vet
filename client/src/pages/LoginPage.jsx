import { useForm } from "react-hook-form";

const { register, handleSubmit } = useForm();

function LoginPage() {
  return (
    <form>
      <b>
        <h2>LOGIN</h2>
      </b>

      <label htmlFor="RUT">RUT:</label>
      <input type="number" {...register("rut", { required: true })} />

      <label htmlFor="password">Contraseña: </label>
      <input type="password" {...register("password", { required: true })} />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default LoginPage;
