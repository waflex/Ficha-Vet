import { useForm } from "react-hook-form"

function IngresoPage() {

    const {register, handleSubmit} = useForm()

    return (
        <form onSubmit={handleSubmit((data) => {
          console.log(data)
        })}>
        <h1>Datos tutor</h1>
        <label htmlFor="RUT">RUT:</label>
        <input type="number"
        { ... register("rut")}
        />
    
        <label htmlFor="normbre">Nombre</label>
        <input type="text"
        { ... register("nombre")}
        />
    
        <label htmlFor="correo">Correo</label>
        <input type="email"
        { ... register("correo")}
        />
    
        <label htmlFor="celular">Celular</label>
        <input type="number"
        { ... register("celular")}
        />
    
        <label htmlFor="direccion">Direccion</label>
        <input type="text"
        { ... register("celular")}/>
    
        <button type="submit">Enviar</button>
      </form>
      )
}

export default IngresoPage