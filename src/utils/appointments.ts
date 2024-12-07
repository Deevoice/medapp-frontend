import axios from 'axios';
import { Appointment } from '@/types/appointment';

interface ApiError {
    detail: string[] | string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/';

const api = axios.create({
    baseURL: apiUrl,
});

export const getAppointments = async (): Promise<Appointment[]> => {
    try {
        const response = await api.get('/appointments/');
        return response.data;
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка получения приемов: ${errorMessage}`);
    }
};

export const addAppointment = async (appointment: Appointment): Promise<Appointment> => {
    try {
        const stringifiedAppointment: Record<string, string> = {
            patient_id: appointment.patientId.toString(), // исправлено на patient_id
            doctor_id: appointment.doctorId.toString(),   // исправлено на doctor_id
            date: appointment.date,
            time: appointment.time,
        };

        const params = new URLSearchParams(stringifiedAppointment);
        const response = await api.post(`/appointments/?${params.toString()}`);

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error(`Неожиданный код состояния: ${response.status}`);
        }
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка добавления приема: ${errorMessage}`);
    }
};

const extractErrorMessage = (error: any): string => {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
        const apiError = error.response.data as ApiError;
        return Array.isArray(apiError.detail) ? apiError.detail.join(', ') : apiError.detail;
    } else {
        return error.message;
    }
};
