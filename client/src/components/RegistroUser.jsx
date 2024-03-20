import { Button, Sidebar, Modal } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { HiUserAdd } from 'react-icons/hi';

function RegistroUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { regUser, IsAuthenticated, errors: regErrors } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {}, [IsAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    const res = regUser(values);
    if (res.status === 201) {
      alert('Usuario registrado con éxito');
    }
    setOpenModal(false); // Close the modal after submitting the form
  });

  return (
    <>
      <Sidebar.Item
        icon={HiUserAdd}
        onClick={() => setOpenModal(true)}
        href="#">
        Agregar Usuario
      </Sidebar.Item>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Registro de Usuario</Modal.Header>
        <Modal.Body>
          {regErrors.map((error, i) => (
            <div key={i} className="bg-red-500 text-white p-2 mb-4 rounded-md">
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="rutUsuario" className="block text-gray-700">
                Rut Usuario
              </label>
              <input
                type="text"
                {...register('rutUsuario', { required: true })}
                className="w-full bg-teal-100 text-gray-800 px-4 py-2 rounded-md mt-1 focus:outline-none focus:ring focus:ring-teal-400"
                placeholder="Rut Usuario"
              />
              {errors.rutUsuario && (
                <p className="text-red-500">Debes ingresar un Rut</p>
              )}
            </div>
            <div>
              <label htmlFor="Nombre" className="block text-gray-700">
                Nombre Usuario
              </label>
              <input
                type="text"
                {...register('Nombre', { required: true })}
                className="w-full bg-teal-100 text-gray-800 px-4 py-2 rounded-md mt-1 focus:outline-none focus:ring focus:ring-teal-400"
                placeholder="Nombre Usuario"
              />
              {errors.Nombre && (
                <p className="text-red-500">Debes ingresar un Nombre</p>
              )}
            </div>
            <div>
              <label htmlFor="TipoUsuario" className="block text-gray-700">
                Tipo de Usuario
              </label>
              <select
                defaultValue={'1'}
                {...register('TipoUsuario', { required: true })}
                className="w-full bg-teal-100 text-gray-800 px-4 py-2 rounded-md mt-1 focus:outline-none focus:ring focus:ring-teal-400">
                <option value="1">Administrador</option>
                <option value="2">Docente</option>
                <option value="3">Alumno</option>
              </select>
              {errors.TipoUsuario && (
                <p className="text-red-500">
                  Debes seleccionar un Tipo de Usuario
                </p>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleSubmit(onSubmit)}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegistroUser;
