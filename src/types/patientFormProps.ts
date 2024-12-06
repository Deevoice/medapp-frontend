import { Patient } from './patient';

export interface PatientFormProps {
    onAdd: (patient: Patient) => void;
    onClose: () => void;
}
