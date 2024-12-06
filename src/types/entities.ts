export interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
    phone_number: string;
}

export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    phone_number: string;
}

export interface Appointment {
    id: number;
    patientId: number;
    doctorId: number;
    date: string;
    time: string;
}

export interface Prescription {
    id: number;
    patientId: number;
    doctorId: number;
    medications: string;
    date: string;
}
