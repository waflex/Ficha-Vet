// import { useForm } from "react-hook-form";
// const { register, handleSubmit } = useForm();

function LoginPage() {
  // const{ register, handleSubmit } = useForm();

  return (
    <form onSubmit
    // ={handleSubmit(async (values) =>{
    //   console.log(values);
    //   const res = await registerRequest(values);
    //   console.log(res);

    // })}
    >
      <b>
        <h2>LOGIN</h2>
      </b>

      <label htmlFor="RUT">RUT:</label>
      {/* <input type="number" {...register("rut", { required: true })} /> */}

      <label htmlFor="password">Contraseña: </label>
      {/* <input type="password" {...register("password", { required: true })} /> */}
      <button type="submit">Registrar</button>
    </form>
  );
}

export default LoginPage;
