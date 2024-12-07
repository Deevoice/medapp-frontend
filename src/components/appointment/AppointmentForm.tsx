import React, { useState } from 'react';
import { Appointment } from '@/types/appointment';

interface AppointmentFormProps {
    onAdd: (appointment: Appointment) => void;
    onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onAdd, onClose }) => {
    const [formData, setFormData] = useState<Appointment>({
        id: 0,
        patientId: 0,
        doctorId: 0,
        date: '',
        time: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value as any });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        onAdd(formData);
        setFormData({ id: 0, patientId: 0, doctorId: 0, date: '', time: '' });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                placeholder="ID пациента"
                required
            />
            <input
                type="number"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                placeholder="ID доктора"
                required
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
            />
            <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Добавить прием</button>
            <button type="button" onClick={onClose}>Отмена</button>
        </form>
    );
};

export default AppointmentForm;
