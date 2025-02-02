import React from 'react';
import { Doctor } from '../objects/Doctor';
import { DoctorCard } from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
  className?: string;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  return (
    <div>
      <div id="doctor-modal"/>
      <h2>Lista de Doctores</h2>
      <div>
      <React.Fragment>
          {doctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              nombre={doctor.nombre}
              especialidad={doctor.especialidad}
              experiencia={doctor.experiencia}
              descripcion={doctor.descripcion}
            />
          ))}
      </React.Fragment>
      </div>
      <div id="doctor-modal" />
    </div>
  );
};

export default DoctorList;