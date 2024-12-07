export interface Prescription {
    id: number;
    patient_id: number;
    doctor_id: number;
    medicine: string;
    date: string;
    dose?: string;
    instructions?: string;
}