import { useState, useEffect } from 'react';
import PatientList from '../components/PatientList';
import PatientForm from '../components/PatientForm';
import { getPatients, addPatient, deletePatient } from '../utils/api';
import { Patient } from '../types/patient';

const Patients = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await getPatients();
                setPatients(data);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchPatients();
    }, []);

    const handleAddPatient = async (newPatient: Patient) => {
        try {
            setIsAdding(true);
            setError(null);
            await addPatient(newPatient);
            const updatedPatients = await getPatients();
            setPatients(updatedPatients);
            setIsAddModalOpen(false);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeletePatient = async (patientId: number) => {
        try {
            setIsDeleting(true);
            setError(null);
            await deletePatient(patientId);
            const updatedPatients = await getPatients();
            setPatients(updatedPatients);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // };

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Пациенты</h1>
            <button onClick={openAddModal}>Добавить пациента</button>
            <PatientList patients={patients} onDelete={handleDeletePatient} />

            <div style={{ display: isAddModalOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                    <PatientForm onAdd={handleAddPatient} onClose={closeAddModal} />
                </div>
            </div>
            {isAdding && <p>Добавление пациента...</p>}
            {isDeleting && <p>Удаление пациента...</p>}
        </div>
    );
};

export default Patients;
