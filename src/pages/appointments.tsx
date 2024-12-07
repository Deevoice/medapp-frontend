import { useState, useEffect } from 'react';
import AppointmentList from '@/components/appointment/AppointmentList';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import { getAppointments, addAppointment } from '@/utils/appointments'; // Убран импорт deleteAppointment
import { Appointment } from '@/types/appointment';
import Layout from '@/components/Layout';
// import '@/styles/appointments.module.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointments();
                setAppointments(data);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchAppointments();
    }, []);

    const handleAddAppointment = async (newAppointment: Appointment) => {
        try {
            setIsAdding(true);
            setError(null);
            await addAppointment(newAppointment);
            const updatedAppointments = await getAppointments();
            setAppointments(updatedAppointments);
            setIsAddModalOpen(false);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <Layout>
            <div className='appointments-main'>
                <h1 className='global__title'>Приемы</h1>
                <div className="table-block">
                    <button className='add-btn' onClick={openAddModal}>+ Добавить прием</button>
                    <AppointmentList appointments={appointments} />

                    <div style={{ display: isAddModalOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                            <AppointmentForm onAdd={handleAddAppointment} onClose={closeAddModal} />
                        </div>
                    </div>

                    {isAdding && <p>Добавление приема...</p>}
                </div>
            </div>
        </Layout>
    );
};

export default Appointments;
