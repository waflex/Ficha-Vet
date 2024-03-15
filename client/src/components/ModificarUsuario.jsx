import { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';

function handleModificar() {
  
}
const ModificarUsuario = (Data) => {
  const [openModal, setOpenModal] = useState(false);

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
        onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Modificar Usuario
          </h2>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="Nombre" value="Nombre Usuario" />
              <TextInput id="Nombre" value={Data.name} required />
            </div>
            <div>
              <Label htmlFor="rut" value="Rut" />
              <TextInput id="rut" value={Data.rut} required />
            </div>

            <div className="max-w-sm mx-auto">
              <label
                htmlFor="Cargo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tipo de Usuario
              </label>
              <select
                id="Cargo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>{Data.Tipo}</option>
                <option value="1">Administrador</option>
                <option value="2">Docente</option>
                <option value="3">Alumno</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group className="inline-flex h-auto flex-auto justify-center items-center">
            <Button
              color="green"
              className="h-full"
              onClick={() => console.log('Guardar')}>
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
