export interface Prescription {
    id: number;
    patientId: number;
    doctorId: number;
    medications: string;
    date: string;
    dose?: string;
    instructions?: string;
}