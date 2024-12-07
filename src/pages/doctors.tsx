import { useState, useEffect } from 'react';
import DoctorList from '@/components/doctor/DoctorList';
import DoctorForm from '@/components/doctor/DoctorForm';
import { getDoctors, addDoctor, deleteDoctor } from '@/utils/doctors';
import { Doctor } from '@/types/doctor';
import Layout from '@/components/Layout';

const Doctors = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await getDoctors();
                setDoctors(data);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchDoctors();
    }, []);

    const handleAddDoctor = async (newDoctor: Omit<Doctor, 'id'>) => {
        try {
            setIsAdding(true);
            setError(null);

            // Предполагая, что addDoctor возвращает добавленного врача с сгенерированным id
            const addedDoctor = await addDoctor(newDoctor);
            setDoctors((prevDoctors) => [...prevDoctors, addedDoctor]); // Добавляем нового врача в состояние

            setIsAddModalOpen(false);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteDoctor = async (doctorId: number) => {
        try {
            setIsDeleting(true);
            setError(null);
            await deleteDoctor(doctorId);
            const updatedDoctors = await getDoctors();
            setDoctors(updatedDoctors);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    if (error) {
        return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
    }

    return (
        <Layout>
            <div className='doctors-main'>
                <h1 className='global__title'>Доктора</h1>
                <div className="table-block">
                    <button className='add-btn' onClick={openAddModal}>+ Добавить доктора</button>
                    <DoctorList doctors={doctors} onDelete={handleDeleteDoctor} />

                    {isAddModalOpen && (
                        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                                <DoctorForm onAdd={handleAddDoctor} onClose={closeAddModal} />
                            </div>
                        </div>
                    )}
                    {isAdding && <p>Добавление доктора...</p>}

                    {isDeleting && <p>Удаление доктора...</p>}
                </div>
            </div>
        </Layout>
    );
};

export default Doctors;
