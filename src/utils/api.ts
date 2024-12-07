import axios from 'axios';
import { Patient } from '@/types/patient';

interface ApiError {
    detail: string[] | string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/';

const api = axios.create({
    baseURL: apiUrl,
});

export const getPatients = async (): Promise<Patient[]> => {
    try {
        const response = await api.get('/patients/');
        return response.data;
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка получения пациентов: ${errorMessage}`);
    }
};

export const addPatient = async (patient: Patient): Promise<Patient> => {
    try {
        console.log(patient);
        const stringifiedPatient: Record<string, string> = {
            name: patient.name,
            age: patient.age.toString(),
            gender: patient.gender,
            address: patient.address,
            phone_number: patient.phoneNumber,
        };

        const params = new URLSearchParams(stringifiedPatient);
        const response = await api.post(`/patients/?${params.toString()}`);

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error(`Неожиданный код состояния: ${response.status}`);
        }
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка добавления пациента: ${errorMessage}`);
    }
};

export const deletePatient = async (patientId: number): Promise<void> => {
    try {
        const response = await api.delete(`/patients/${patientId}`);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Ошибка удаления пациента: ${response.status} ${response.statusText}`);
        }
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка удаления пациента: ${errorMessage}`);
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
