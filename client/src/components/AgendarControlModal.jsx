import { useForm } from 'react-hook-form';
import { Button, Modal, Datepicker } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { crearControl } from '../api/controles';

function AgendarControlButton(Datos) {
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);

  const onSubmit = async (data) => {
    const horaSeleccionada = data.hora;
    const [hora, minutos] = horaSeleccionada.split(':');

    // Convertir a objeto de fecha
    const fechaHora = new Date(selectedDate.setHours(hora, minutos));
    console.log('Fecha y hora', fechaHora.toISOString());
    const valores = {
      _id: Datos.Mid,
      Fecha: fechaHora.toISOString(),
      Estado: 'Pendiente',
    };
    try {
      const res = await crearControl({ valores });
      console.log('Control creado:', res);
      setOpenModal(false);
    } catch (error) {
      console.error('Error al crear el control:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Agendar Control</Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Seleccione una Fecha y Hora
              </h3>
              <Datepicker
                language="es-MX"
                weekStart={1}
                onSelectedDateChanged={handleDateChange}
                minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                className="block w-full rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300"
              />

              <input
                {...register('hora')}
                type="time"
                className="block w-full rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300"
              />
              <div className="flex justify-center gap-4 mt-6">
                <Button type="submit" gradientDuoTone="cyanToBlue">
                  Agendar
                </Button>
                <Button
                  type="button"
                  color="failure"
                  onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default AgendarControlButton;
