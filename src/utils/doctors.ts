import axios from 'axios';
import { Doctor } from '@/types/doctor';

interface ApiError {
    detail: string[] | string;
}

// Правильное определение базового URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/'; // используйте "||" для обработки случая без переменной

const api = axios.create({
    baseURL: apiUrl,
});

export const getDoctors = async (): Promise<Doctor[]> => {
    try {
        const response = await api.get('/doctors/'); // правильно: /doctors/
        return response.data;
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка получения врачей: ${errorMessage}`);
    }
};

export const addDoctor = async (doctor: Omit<Doctor, 'id'>): Promise<Doctor> => {
    try {
        console.log(doctor);

        const stringifiedDoctor: Record<string, string> = {
            name: doctor.name,
            specialization: doctor.specialization,
            phone_number: doctor.phone_number,
        };

        const params = new URLSearchParams(stringifiedDoctor);

        const response = await api.post(`/doctors/?${params.toString()}`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error(`Неожиданный код состояния: ${response.status}`);
        }
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка добавления врача: ${errorMessage}`);
    }
};


export const deleteDoctor = async (doctorId: number): Promise<void> => {
    try {
        const response = await api.delete(`/doctors/${doctorId}`);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Ошибка удаления врача: ${response.status} ${response.statusText}`);
        }
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка удаления врача: ${errorMessage}`);
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
