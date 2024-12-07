import axios from 'axios';
import { Prescription } from '@/types/prescription';

interface ApiError {
    detail: string[] | string;
}

// Исправлено: Убедитесь, что вы используете правильный оператор присваивания
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/';

const api = axios.create({
    baseURL: apiUrl,
});

export const getPrescriptions = async (): Promise<Prescription[]> => {
    try {
        const response = await api.get('/prescriptions/');
        return response.data;
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка получения рецептов: ${errorMessage}`);
    }
};

export const addPrescription = async (prescription: Prescription): Promise<Prescription> => {
    try {
        const params = new URLSearchParams({
            patient_id: prescription.patient_id.toString(),
            doctor_id: prescription.doctor_id.toString(),
            medicine: prescription.medicine,
            dose: prescription.dose || '',
            instructions: prescription.instructions || '',
            date: prescription.date,
        });

        const response = await api.post(`/prescriptions/?${params.toString()}`);

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error(`Неожиданный код состояния: ${response.status}`);
        }
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка добавления рецепта: ${errorMessage}`);
    }
};


export const deletePrescription = async (prescriptionId: number): Promise<void> => {
    try {
        const response = await api.delete(`/prescriptions/${prescriptionId}`);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Ошибка удаления рецепта: ${response.status} ${response.statusText}`);
        }
    } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        throw new Error(`Ошибка удаления рецепта: ${errorMessage}`);
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
