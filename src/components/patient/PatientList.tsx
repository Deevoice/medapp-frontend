import React from 'react';
import { Patient } from '@/types/patient';

interface PatientListProps {
    patients: Patient[];
    onDelete: (patientId: number) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onDelete }) => (
    <ul className='db-list'>
        {patients.map((patient) => (
            <li className='db-elem' key={patient.id}>
                {patient.name}, {patient.age}, {patient.gender}, {patient.address}, {patient.phoneNumber}
                <button onClick={() => onDelete(patient.id)}>Удалить</button>
            </li>
        ))}
    </ul>
);

export default PatientList;
