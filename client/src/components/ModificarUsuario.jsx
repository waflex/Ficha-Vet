import { useState, useEffect } from 'react';
import { Modal, Button } from 'flowbite-react';

const ModificarUsuario = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);

  // Función para obtener los datos del usuario seleccionado
  const obtenerDatosUsuario = async () => {
    try {
      // Realiza una llamada a la API para obtener los datos del usuario
      const response = await fetch('URL_DE_LA_API');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  useEffect(() => {
    // Llama a la función para obtener los datos del usuario cuando se monta el componente
    obtenerDatosUsuario();
  }, []);

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Abrir Modal</Button>

      {showModal && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Terms of Service</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>I accept</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Decline
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ModificarUsuario;
