import { useForm } from "react-hook-form"
import {registerRequest} from '../api/registroDatos'

function IngresoPage() {

    const {register, handleSubmit} = useForm()

    return (
        <form onSubmit={handleSubmit(async (values) => {
          console.log(values)
          const res =  await registerRequest(values)
          console.log(res)
        })}>
        <h1>Datos tutor</h1>
        <label htmlFor="RUT">RUT:</label>
        <input type="number"
        { ... register("rut", {required: true})}
        />
    
        <label htmlFor="normbre">Nombre</label>
        <input type="text"
        { ... register("nombre", {required: true})}
        />
    
        <label htmlFor="correo">Correo</label>
        <input type="email"
        { ... register("correo", {required: true})}
        />
    
        <label htmlFor="celular">Celular</label>
        <input type="number"
        { ... register("celular", {required: true})}
        />
    
        <label htmlFor="direccion">Direccion</label>
        <input type="text"
        { ... register("celular", {required: true})}/>
    
        <button type="submit">Registrar</button>
      </form>
      )
}

export default IngresoPage