import { useState } from 'react';
import { api } from '../utils/api';

interface PatientData {
    name: string;
    age: string;
    gender: string;
    address: string;
    phone_number: string;
}

export default function PatientForm() {
    const [formData, setFormData] = useState<PatientData>({ name: '', age: '', gender: '', address: '', phone_number: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.addPatient(formData);
            // Обновить список пациентов, возможно, перезагрузить страницу
            setFormData({ name: '', age: '', gender: '', address: '', phone_number: '' });
        } catch (error: any) {
            console.error("Ошибка при добавлении пациента:", error);
            // Обработка ошибок, например, вывод сообщения об ошибке пользователю
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Имя:
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </label>
            <label>
                Возраст:
                <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
            </label>
            {/* ... другие поля */}
            <button type="submit">Добавить</button>
        </form>
    );
}
