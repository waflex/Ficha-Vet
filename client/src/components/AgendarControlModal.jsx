'use client';
import { useForm } from 'react-hook-form';
import { Button, Modal, Datepicker } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function AgendarControlButton() {
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit } = useForm();

  return (
    <>
    <form>
      <Button onClick={() => setOpenModal(true)}>Agendar Control</Button>
      <Modal
        show={openModal}
        size="xl"
        onClose={() => setOpenModal(false)}
        popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Seleccione una Fecha
            </h3>
            <Datepicker inline />

            <div className="flex justify-center gap-4 mt-6">
              <Button
                gradientDuoTone="cyanToBlue"
                onClick={() => setOpenModal(false)}>
                {'Agendar'}
              </Button>
              <Button color="failure" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </form>
    </>
  );
}
export default AgendarControlButton;
