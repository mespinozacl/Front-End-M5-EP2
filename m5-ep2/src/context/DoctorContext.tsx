import { createContext} from 'react';
import { Doctor } from '../objects/Doctor';

export interface DoctorContextType {
    doctors: Doctor[];
    doctor: Doctor;
    setDoctor: (doctor: Doctor) => void;
    setDoctors: (doctor: Doctor[]) => void;
    showModalDoctor: boolean;
    setShowModalDoctor: (show: boolean) => void;
  }

export const DoctorContext = createContext<DoctorContextType>(
  {} as unknown as DoctorContextType
);