import React from 'react';
import { Patient } from '../types/patient';

interface PatientListProps {
    patients: Patient[];
    onDelete: (patientId: number) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onDelete }) => (
    <ul>
        {patients.map((patient) => (
            <li key={patient.id}>
                {patient.name}, {patient.age}, {patient.gender} -
                <button onClick={() => onDelete(patient.id)}>Удалить</button>
            </li>
        ))}
    </ul>
);

export default PatientList;
