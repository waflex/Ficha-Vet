import { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';
import { actualizarUsuario } from '../api/Usuarios';
import { useAuth } from '../context/AuthContext';

const ModificarUsuario = (Data) => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const initialFormData = {
    Nombre: Data.Nombre,
    rutUsuario: Data.rutUsuario,
    tipoUsuario: Data.tipoUsuario, // Asumiendo que Data.Tipo contiene el tipo de usuario en el formato correcto
  };

  // Establecer el estado formData con el estado inicial
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModificar = async () => {
    try {
      // Construir el objeto con los campos modificados
      const modifiedData = {};
      for (const key in formData) {
        if (Data[key] !== formData[key]) {
          modifiedData[key] = formData[key];
        }
      }
      // Enviar los campos modificados al backend utilizando la función importada
      const response = await actualizarUsuario(Data.id, modifiedData);
      if (response.status === 200) {
        alert('Cambios Guardados');
        // window.location.reload();
      }
      // Verificar la respuesta y manejarla según sea necesario

      // Cerrar el modal después de la actualización exitosa
      setFormData({});
      // setOpenModal(false);
    } catch (error) {
      console.error(error);
      // Manejar errores de actualización aquí
    }
  };
  return (
    <>
      <Button.Group outline>
        <Button color="gray" onClick={() => setOpenModal(true)}>
          <HiUserCircle />
          Modificar
        </Button>
      </Button.Group>
      <Modal
        show={openModal}
        size="md"
        popup
        position={'center'}
        onClose={() => setOpenModal(false)}>
        <Modal.Header className="flex text-center text-lg font-bold text-gray-900 dark:text-white">
          Modificar Usuario
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="Nombre" value="Nombre Usuario" />
              <TextInput
                id="Nombre"
                name="Nombre"
                value={formData.Nombre} // Verificar que 'formData.Nombre' refleje el estado actual
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="rut"
                value="Rut (para modificar, contacte a soporte)"
              />
              <TextInput
                id="rut"
                name="rutUsuario"
                value={formData.rutUsuario} // Verificar que 'formData.rutUsuario' refleje el estado actual
                disabled={true}
                required
              />
            </div>
            <div className="max-w-sm mx-auto">
              <label
                htmlFor="Cargo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tipo de Usuario
              </label>
              <select
                id="Cargo"
                name="tipoUsuario"
                onChange={handleChange}
                defaultValue={tipoUsuario(formData.tipoUsuario)}
                disabled={formData.rutUsuario === user.rutUsuario}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="1">Administrador</option>
                <option value="2">Docente</option>
                <option value="3">Alumno</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group className="inline-flex h-auto flex-auto justify-center items-center">
            <Button color="green" className="h-full" onClick={handleModificar}>
              Guardar Cambios
            </Button>
            <Button
              color="failure"
              className="h-full"
              onClick={() => setOpenModal(false)}>
              Restablecer Contraseña
            </Button>
            <Button
              color="failure"
              className="h-full"
              onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModificarUsuario;

function tipoUsuario(tipoUsuario) {
  switch (tipoUsuario) {
    case 'Administrador':
      return 1;
    case 'Docente':
      return 2;
    case 'Alumno':
      return 3;
    default:
      return 1;
  }
}
