import React from 'react';
import { Prescription } from '@/types/prescription';

interface PrescriptionListProps {
    prescriptions: Prescription[];
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
    console.log('Prescriptions:', prescriptions);

    return (
        <ul className='db-list'>
            {prescriptions.map((prescription) => (
                <li className='db-elem' key={prescription.id}>
                    Пациент ID: {prescription.patient_id} - Доктор ID: {prescription.doctor_id} -
                    Медикаменты: {prescription.medicine} - Дата: {prescription.date} -
                    Дозировка: {prescription.dose ? prescription.dose : 'Не указана'} -
                    Инструкции: {prescription.instructions ? prescription.instructions : 'Не указаны'}
                </li>
            ))}
        </ul>
    );
};

export default PrescriptionList;
