import React, { useContext } from 'react';
import { DoctorContext } from '../context/DoctorContext';


interface DoctorCardProps {
  nombre: string;
  especialidad: string;
  experiencia: number;
  descripcion: string;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  nombre,
  especialidad,
  experiencia,
  descripcion,
}) => {
  const { setDoctor, setShowModalDoctor } = useContext(DoctorContext);

  return (
    <>
      <h3 className="card-title">{nombre}</h3><h5>{especialidad}</h5>
        <p className="card-text">
        {descripcion}
        <br />
        <strong>Experiencia:</strong> {experiencia} años
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setDoctor({
            nombre, especialidad, experiencia, descripcion,
            getNombre: function (): string {
              throw new Error('Function not implemented.');
            },
            getEspecialidad: function (): string {
              throw new Error('Function not implemented.');
            },
            getExperiencia: function (): number {
              throw new Error('Function not implemented.');
            },
            getDescripcion: function (): string {
              throw new Error('Function not implemented.');
            },
          });
        setShowModalDoctor(true);
      } }
      >
      Ver Info
      </button>
    </>
  );
};

export default DoctorCard;