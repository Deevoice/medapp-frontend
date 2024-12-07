import React, { useState } from 'react';
import { Prescription } from '@/types/prescription';

interface PrescriptionFormProps {
    onAdd: (prescription: Prescription) => void;
    onClose: () => void;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ onAdd, onClose }) => {
    const [formData, setFormData] = useState<Prescription>({
        id: 0,
        patient_id: 0,
        doctor_id: 0,
        medicine: '',
        date: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        onAdd(formData);
        setFormData({ id: 0, patient_id: 0, doctor_id: 0, medicine: '', date: '' });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                name="patientId"
                value={formData.patient_id}

                onChange={handleInputChange}
                placeholder="ID пациента"
                required
            />
            <input
                type="number"
                name="doctorId"
                value={formData.doctor_id}
                onChange={handleInputChange}
                placeholder="ID доктора"
                required
            />
            <textarea
                name="medications"
                value={formData.medicine}
                onChange={handleInputChange}
                placeholder="Медикаменты"
                required
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Добавить рецепт</button>
            <button type="button" onClick={onClose}>Отмена</button>
        </form>
    );
};

export default PrescriptionForm;
