import React from 'react';
import { Doctor } from '@/types/doctor';

interface DoctorListProps {
    doctors: Doctor[];
    onDelete: (doctorId: number) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, onDelete }) => {
    return (
        <div>
            <ul className='db-list'>
                {doctors.map((doctor) => (
                    <li className='db-elem' key={doctor.id}>
                        {doctor.name} - {doctor.specialization} - {doctor.phone_number}
                        <button onClick={() => onDelete(doctor.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;
