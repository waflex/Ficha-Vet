import { useForm } from 'react-hook-form';
import { Button, Modal, Datepicker } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { crearControl } from '../api/controles';

function AgendarControlButton(Datos) {
  const [openModal, setOpenModal] = useState(false);
  const { handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState('');

  const onSubmit = async () => {
    const [hora, minutos] = horaSeleccionada.split(':');

    // Convertir a objeto de fecha
    const fechaHora = new Date(selectedDate.setHours(hora, minutos));
    const valores = {
      _id: Datos.Mid,
      Fecha: fechaHora.toISOString(),
      Estado: 'Pendiente',
    };
    try {
      const res = await crearControl({ valores });
      if (res.data && res.data.message === 'Control ya creado') {
        alert(
          'Ya existe un control agendado, para volver a agendar debe cancelar el control existente.'
        );
        setOpenModal(false);
        return;
      } else {
        alert('Control creado', res.data);
        setOpenModal(false);
      }
    } catch (error) {
      console.error('Error al crear el control:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Opciones de horas disponibles
  const horasDisponibles = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
  ];

  // Manejar el cambio de la hora seleccionada
  const handleHoraChange = (event) => {
    setHoraSeleccionada(event.target.value);
  };
  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Agendar Control
      </Button>
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

              <div>
                <label htmlFor="hora">Selecciona una hora:</label>
                {/* Selector personalizado de horas */}
                <select
                  id="hora"
                  name="hora"
                  value={horaSeleccionada}
                  onChange={handleHoraChange}
                  className="block w-full rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300">
                  <option value="">Seleccionar hora</option>
                  {/* Mapear las horas disponibles para crear las opciones */}
                  {horasDisponibles.map((hora, index) => (
                    <option key={index} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              </div>
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
