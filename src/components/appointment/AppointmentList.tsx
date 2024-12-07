import React from 'react';
import { Appointment } from '@/types/appointment';

interface AppointmentListProps {
    appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
    return (
        <div>
            <ul className='db-list'>
                {appointments.map((appointment) => (
                    <li className='db-elem' key={appointment.id}>
                        Пациент ID: {appointment.patient_id} - Доктор ID: {appointment.doctor_id} - Дата: {appointment.date} - Время: {appointment.time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
