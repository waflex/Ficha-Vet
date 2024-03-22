import { useForm } from 'react-hook-form';
import { registroConsulta } from '../api/registroDatos';
import { useMascotas } from '../context/MascotasContext'; // Importar el contexto de mascotas
import { Lateral } from '../components/Sidebar';
import {
  FloatingLabel,
  Checkbox,
  Label,
  Select,
  Textarea,
} from 'flowbite-react';
import { useEffect, useState } from 'react';

function IngresoPage() {
  const [rut, setRut] = useState('');
  const { Tutores, getTutores } = useMascotas();
  const [rutValido, setRutValido] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [tutoresSimilares, setTutoresSimilares] = useState([]);
  const [ShowTutor, setShowTutor] = useState(false);

  useEffect(() => {
    getTutores();
  }, []);

  const onSubmit = async (values) => {
    const res = await registroConsulta(values);
    if (res.status === 201) {
      alert('Consulta registrada con éxito');
      window.location.href = '/SalaDeEspera';
    }
  };
  const handleRutChange = (event) => {
    const rutSinFormato = event.target.value.replace(/[^\dkK]/g, '');
    setRut(rutSinFormato);
    setRutValido(validarRut(rutSinFormato));

    // Si el RUT ingresado es válido, realizar búsqueda de tutores similares
    console.log(rutSinFormato.length);
    if (rutSinFormato.length > 0) {
      setShowTutor(true);
    } else {
      setShowTutor(false);
    }
    buscarTutoresSimilares(rutSinFormato);

    if (rutValido) {
      // buscarTutoresSimilares(rutSinFormato);
    } else {
      // Si el RUT no es válido, limpiar la lista de tutores similares
      // setTutoresSimilares([]);
    }
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
  const buscarTutoresSimilares = (rut) => {
    const tutoresSimilaresEncontrados =
      Tutores &&
      Tutores.tutores.filter((tutor) => tutor.rutTutor.startsWith(rut));
    setTutoresSimilares(tutoresSimilaresEncontrados);
  };

  const handleCheck = (e) => {
    // Obtener el RUT del tutor seleccionado
    const selectedRut = e.target.innerText;

    // Buscar el tutor correspondiente en la lista de tutores similares
    const selectedTutor = tutoresSimilares.find(
      (tutor) => tutor.rutTutor === selectedRut
    );

    console.log(selectedTutor);
    // Verificar si se encontró el tutor
    if (selectedTutor) {
      // Establecer el RUT en el estado
      setRut(selectedRut);

      // Establecer los demás campos del formulario con los datos del tutor seleccionado
      setValue('existenciaTutor', true);
      setValue('nombreTutor', selectedTutor.Nombre);
      setValue('correo', selectedTutor.Correo);
      setValue('celular', selectedTutor.Celular);
      setValue('direccion', selectedTutor.Direccion);

      // Limpiar la lista de tutores similares
      setTutoresSimilares([]);
    }
  };

  return (
    <div className="flex h-full">
      {/* Menú */}
      <Lateral />

      <div
        className="flex-grow p-4 max-h-full overflow-y-auto"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(22, 189, 202, 0.1), rgba(23, 189, 202, 0.5)),url(/img/Background_Ingreso.jpg)`,
          backgroundSize: 'cover',
        }}>
        <div className="text-center mb-0">
          <h1 className="text-2xl font-bold" id="tit-form-ing">
            Formulario de ingreso
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-0 p-2 rounded backdrop-blur-md font-robot">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-bold mb-2">Datos tutor</h2>
              <div>
                <Checkbox {...register('existenciaTutor')} disabled />
                <Label
                  htmlFor="existenciaTutor"
                  className="w-full dark:text-black">
                  Existente
                </Label>
              </div>
              <div className="relative">
                <FloatingLabel
                  variant="filled"
                  label="Rut"
                  className="w-full my-2 dark:text-gray-200 rounded-md"
                  value={rut}
                  maxLength={12}
                  onChange={handleRutChange}
                  color={rutValido ? 'success' : 'error'}
                />
                {!rutValido && (
                  <span className="text-failure text-red-900 absolute top-0 -mt-3">
                    RUT inválido
                  </span>
                )}
                {ShowTutor && tutoresSimilares.length > 0 && (
                  <div className="absolute top-0 right-0 bg-slate-300 mt-2 z-10 p-4 rounded-md shadow-md">
                    <h3 className="font-bold">Tutores:</h3>
                    <ul>
                      {tutoresSimilares.map((tutor, index) => (
                        <li
                          key={index}
                          onClick={handleCheck}
                          className="cursor-pointer hover:bg-gray-200 rounded-md p-1 mb-1">
                          {tutor.rutTutor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <FloatingLabel
                variant="filled"
                label="Nombre Tutor"
                className="my-2  dark:text-gray-200 rounded-md"
                {...register('nombreTutor', { required: true })}
              />

              <FloatingLabel
                variant="filled"
                label="Correo"
                className="my-2  dark:text-gray-200 rounded-md"
                {...register('correo', { required: true })}
              />

              <FloatingLabel
                variant="filled"
                label="Celular"
                className="my-2  dark:text-gray-200 rounded-md"
                {...register('celular', { required: true })}
              />

              <FloatingLabel
                variant="filled"
                label="Direccion"
                className="my-2  dark:text-gray-200 rounded-md"
                {...register('direccion', { required: true })}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Datos mascota</h2>
                <Checkbox {...register('existenciaMascota')} />
                <Label
                  htmlFor="existenciaTutor"
                  className=" dark:text-gray-900">
                  Existente
                </Label>
              </div>
              <FloatingLabel
                variant="filled"
                label="Rut o Chip Mascota (Opcional)"
                className="my-2 rounded-md"
                {...register('rutChip', { required: false })}
              />
              <FloatingLabel
                variant="filled"
                label="Nombre Mascota"
                className="my-2  dark:text-gray-200 rounded-md"
                {...register('nombreMascota', { required: true })}
              />

              <div className="max-w">
                <div className="mb-2 block">
                  <Label
                    htmlFor="especie"
                    value="Seleccione la Especie:"
                    className=" dark:text-gray-200"
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
                variant="filled"
                label="Raza"
                className="my-2 dark:text-gray-200 rounded-md"
                {...register('raza', { required: true })}
              />
              <div className="max-w">
                <div className="mb-2 block ">
                  <Label
                    htmlFor="antcedentes"
                    className=" dark:text-gray-200"
                    value="Antecedentes o Problemas de salud"
                  />
                </div>
                <Textarea
                  placeholder="Antecedentes medicos de la mascota."
                  {...register('antecedentes', { required: false })}
                  className="text-black  dark:text-gray-200"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="mt-0">
            <h2 className="text-xl font-bold mb-2 dark:text-gray-800">
              Síntomas/Observaciones
            </h2>
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
