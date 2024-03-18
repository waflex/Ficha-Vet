import { useForm } from 'react-hook-form';
import { registroConsulta } from '../api/registroDatos';
import { Lateral } from '../components/Sidebar';
import {
  FloatingLabel,
  Checkbox,
  Label,
  Select,
  Textarea,
} from 'flowbite-react';
import { HiMenu } from 'react-icons/hi';
import { useState } from 'react';

function IngresoPage() {
  const [rut, setRut] = useState('');
  const [rutValido, setRutValido] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (values) => {
    const res = await registroConsulta(values);
    if (res.status === 201) {
      alert('Consulta registrada con éxito');
      window.location.href = '/SalaDeEspera';
    }
  };
  const handleRutChange = (event) => {
    let rutSinFormato = event.target.value.replace(/[^\dkK]/g, ''); // Eliminar caracteres que no son números ni 'k' ni 'K'
    const cursorPosition = event.target.selectionStart;
    if (
      event.target.value.charAt(cursorPosition - 1) === '-' &&
      cursorPosition === event.target.value.length
    ) {
      rutSinFormato = rutSinFormato.slice(0, -1); // Eliminar el último carácter (el guion)
    }
    // Eliminar los puntos y guiones actuales
    rutSinFormato = rutSinFormato.replace(/[\.\-]/g, '');

    // Agregar guión después de los primeros dos grupos de números
    rutSinFormato = rutSinFormato.replace(
      /^(\d{1,2})(\d{1,3})(\d{0,3})(\w{0,1})$/,
      '$1.$2.$3-$4'
    );

    setRut(rutSinFormato);

    // Validar RUT
    setRutValido(validarRut(rutSinFormato));
  };
  const validarRut = (rut) => {
    if (!rut) return false;

    // Obtener dígito verificador
    const dv = rut.slice(-1).toUpperCase();
    const rutNumeros = rut.slice(0, -2).replace(/\./g, '');
    let suma = 0;
    let multiplicador = 2;

    // Calcular suma ponderada de los números del rut
    for (let i = rutNumeros.length - 1; i >= 0; i--) {
      suma += parseInt(rutNumeros.charAt(i), 10) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    // Calcular dígito verificador esperado
    const dvEsperado = 11 - (suma % 11);

    // Comparar dígito verificador esperado con el proporcionado
    if (dvEsperado === 10) {
      return dv === 'K';
    } else if (dvEsperado === 11) {
      return dv === '0';
    } else {
      return dv == dvEsperado;
    }
  };
  return (
    <div className="flex h-full">
      {/* Menú */}
      <Lateral />

      <div
        className="flex-grow p-4 max-h-full overflow-y-auto"
        style={{
          backgroundImage: `url(/img/Background_Ingreso.jpg)`,
          backgroundSize: 'cover',
        }}>
        <div className="text-center mb-0">
          <h1 className="text-2xl font-bold" id="tit-form-ing">
            Formulario de ingreso
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-0 p-2 rounded backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-bold mb-2">Datos tutor</h2>
              <div>
                <Checkbox {...register('existenciaTutor')} />
                <Label
                  htmlFor="existenciaTutor"
                  className="w-full dark:text-black">
                  Existente
                </Label>
              </div>
              <FloatingLabel
                variant="outlined"
                label="Rut"
                className={`w-full my-2 bg-transparent dark:text-black dark:bg-transparent`}
                value={rut}
                onChange={handleRutChange}
                color={rutValido ? 'success' : 'error'}
              />
              {!rutValido && <span className="text-failure">RUT inválido</span>}

              <FloatingLabel
                variant="outlined"
                label="Nombre Tutor"
                className="my-2 bg-transparent dark:text-black dark:bg-transparent"
                {...register('nombreTutor', { required: true })}
              />

              <FloatingLabel
                variant="outlined"
                label="Correo"
                className="my-2 bg-transparent dark:text-black dark:bg-transparent"
                {...register('correo', { required: true })}
              />

              <FloatingLabel
                variant="outlined"
                label="Celular"
                className="my-2 bg-transparent dark:text-black dark:bg-transparent"
                {...register('celular', { required: true })}
              />

              <FloatingLabel
                variant="outlined"
                label="Direccion"
                className="my-2 bg-transparent dark:text-black dark:bg-transparent"
                {...register('direccion', { required: true })}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Datos mascota</h2>
                <Checkbox {...register('existenciaMascota')} />
                <Label
                  htmlFor="existenciaTutor"
                  className="bg-transparent dark:text-black dark:bg-transparent">
                  Existente
                </Label>
              </div>
              <FloatingLabel
                variant="outlined"
                label="Rut o Chip Mascota (Opcional)"
                className="my-2 bg-transparent dark:text-black dark:bg-transparent"
                {...register('rutChip', { required: false })}
              />
              <FloatingLabel
                variant="outlined"
                label="Nombre Mascota"
                className="my-2 bg-transparent dark:text-black dark:bg-transparent"
                {...register('nombreMascota', { required: true })}
              />

              <div className="max-w">
                <div className="mb-2 block">
                  <Label
                    htmlFor="especie"
                    value="Seleccione la Especie:"
                    className="bg-transparent dark:text-black dark:bg-transparent"
                  />
                </div>
                <Select
                  className="bg-transparent dark:text-black dark:bg-transparent"
                  {...register('especie', { required: true })}
                  required>
                  <option value="perro">Perro</option>
                  <option value="gato">Gato</option>
                  <option value="ave">Ave</option>
                  <option value="roedor">Roedor</option>
                  <option value="iguana">Iguana</option>
                </Select>
              </div>

              <FloatingLabel
                variant="outlined"
                label="Raza"
                className="my-2 bg-transparent dark:text-black dark:bg-transparent"
                {...register('raza', { required: true })}
              />
              <div className="max-w">
                <div className="mb-2 block ">
                  <Label
                    htmlFor="antcedentes"
                    className="bg-transparent dark:text-black dark:bg-transparent"
                    value="Antecedentes o Problemas de salud"
                  />
                </div>
                <Textarea
                  placeholder="Antecedentes medicos de la mascota."
                  {...register('antecedentes', { required: false })}
                  className="text-black bg-transparent dark:text-black dark:bg-transparent"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="mt-0">
            <h2 className="text-xl font-bold mb-2">Síntomas/Observaciones</h2>
            <Textarea
              {...register('comentarios')}
              placeholder="Observaciones o síntomas de la mascota."
              className="w-full border p-2 mb-0"
              required
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-2">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default IngresoPage;
