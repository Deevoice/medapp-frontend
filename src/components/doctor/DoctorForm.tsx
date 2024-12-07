import React, { useState } from 'react';
import { Doctor } from '@/types/doctor';

interface DoctorFormProps {
    onAdd: (doctor: Omit<Doctor, 'id'>) => void; // Здесь указываем, что ожидается doctor без id
    onClose: () => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ onAdd, onClose }) => {
    const [formData, setFormData] = useState<Omit<Doctor, 'id'>>({
        name: '',
        specialization: '',
        phone_number: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        onAdd(formData); // Передаем данные без id
        setFormData({ name: '', specialization: '', phone_number: '' });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Имя"
                required
            />
            <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="Специализация"
                required
            />
            <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Номер телефона"
                required
            />
            <button type="submit">Добавить врача</button>
            <button type="button" onClick={onClose}>Отмена</button>
        </form>
    );
};

export default DoctorForm;
