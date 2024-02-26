import { useForm } from "react-hook-form";
import {registerRequest} from '../api/registroDatos';

function IngresoPage() {

    const {register, handleSubmit} = useForm()

    return (
        <form onSubmit={handleSubmit(async (values) => {
          console.log(values)
          const res =  await registerRequest(values)
          console.log(res)
        })}>
          <div>

          <b><h1>Formulario de ingreso</h1></b>
        <b><h2>Datos tutor</h2></b>

        <label htmlFor="RUT">RUT:</label>
        <input type="number"
        { ... register("rut", {required: true})}
        />
    
        <label htmlFor="nombreTutor">Nombre</label>
        <input type="text"
        { ... register("nombreTutor", {required: true})}
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
        { ... register("direccion", {required: true})}/>
    
        <button type="submit">Registrar</button>
        </div>

        <b><h2>Datos mascota</h2></b>

        <label htmlFor="rutChip">RUT o Chip:</label>
        <input type="number"
        { ... register("rutChip", {required: true})}
        />

        <label htmlFor="nombreMascota">Nombre:</label>
        <input type="text"
        { ... register("nombremascota", {required: true})}
        />

        <label htmlFor="Especie">Especie:</label>
        <select { ... register("especie", {required: true})}>
        <option value="perro">Perro</option>
        <option value="gato">Gato</option>
        <option value="ave">Ave</option>
        <option value="roedor">Roedor</option>
        <option value="iguana">Iguana</option>
        </select>

        <label htmlFor="raza">Raza:</label>
        <input type="text"
        { ... register("raza")}
        />

        <label htmlFor="antecedentesMedicos">Antecedentes médicos:</label>
        <input type="textarea"
         {... register("antecedentesMedicos", {required: true})}
        />
        <button type="submit">Registrar</button>






      </form>  
    )
}
export default IngresoPage