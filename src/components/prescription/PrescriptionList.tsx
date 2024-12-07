import React from 'react';
import { Prescription } from '@/types/prescription';

interface PrescriptionListProps {
    prescriptions: Prescription[];
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
    return (
        <ul className='db-list'>
            {prescriptions.map((prescription) => (
                <li className='db-elem' key={prescription.id}>
                    Пациент ID: {prescription.patientId} - Доктор ID: {prescription.doctorId} - Медикаменты: {prescription.medications} - Дата: {prescription.date}
                </li>
            ))}
        </ul>
    );
};

export default PrescriptionList;
