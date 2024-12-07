import React, { useState, useEffect } from 'react';
import { Patient } from '@/types/patient';

interface PatientFormProps {
    onAdd: (patient: Patient) => void;
    onClose: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onAdd, onClose }) => {
    const [formData, setFormData] = useState<Patient>({
        id: 0,
        name: '',
        age: 0,
        gender: '',
        address: '',
        phoneNumber: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value as any });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        onAdd(formData);
        setFormData({ id: 0, name: '', age: 0, gender: '', address: '', phoneNumber: '' });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Имя" required />
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Возраст" required />
            <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} placeholder="Пол" required />
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Адрес" required />
            <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Номер телефона"
                required
            />
            <button type="submit">Добавить пациента</button>
            <button type="button" onClick={onClose}>Отмена</button>
        </form>
    );
};

export default PatientForm;

