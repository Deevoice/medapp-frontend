import { useState, useEffect } from 'react';
import PrescriptionList from '@/components/prescription/PrescriptionList';
import PrescriptionForm from '@/components/prescription/PrescriptionForm';
import { getPrescriptions, addPrescription } from '@/utils/prescriptions';
import { Prescription } from '@/types/prescription';
import Layout from '@/components/Layout';
// import '@/styles/prescriptions.module.css';

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const data = await getPrescriptions();
                setPrescriptions(data);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchPrescriptions();
    }, []);

    const handleAddPrescription = async (newPrescription: Prescription) => {
        try {
            setIsAdding(true);
            setError(null);
            await addPrescription(newPrescription);
            const updatedPrescriptions = await getPrescriptions();
            setPrescriptions(updatedPrescriptions);
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
            <div className='prescriptions-main'>
                <h1 className='global__title'>Рецепты</h1>
                <div className="table-block">
                    <button className='add-btn' onClick={openAddModal}>+ Добавить рецепт</button>
                    <PrescriptionList prescriptions={prescriptions} />

                    <div style={{ display: isAddModalOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                            <PrescriptionForm onAdd={handleAddPrescription} onClose={closeAddModal} />
                        </div>
                    </div>
                    {isAdding && <p>Добавление рецепта...</p>}

                    {isDeleting && <p>Удаление рецепта...</p>}
                </div>
            </div>
        </Layout>
    );
};

export default Prescriptions;
