import  { useState } from 'react';
import AgendarControlModal from './AgendarControlModal';

const AgendarControlButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="px-4 py-4 text-sm font-medium text-white ms-5 bg-blue-900 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        Agendar Control
      </button>

      {modalVisible && <AgendarControlModal onClose={() => setModalVisible(false)} />}
    </div>
  );
};

export default AgendarControlButton;
