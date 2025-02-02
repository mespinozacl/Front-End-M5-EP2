import React, { useState, useEffect, useContext } from 'react';
import MainLayout from "../layouts/MainLayout";
import { fetchDoctors } from '../services/DoctorAPI';
import DoctorList from '../components/DoctorList';
import DoctorModal from '../components/DoctorModal';
import { DoctorContext } from '../context/DoctorContext';
import { Doctor } from '../objects/Doctor';

export default function EquipoMedico() {
  const [isLoading, setIsLoading] = useState(true);
  const { doctors, setDoctors, showModalDoctor, setShowModalDoctor } = useContext(DoctorContext);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filterBySpec = (term: string) => {
    setSearchTerm(term);
    if (!doctors) return; // Important: Guard against undefined doctors

    if (!term) {
      setFilteredDoctors(doctors);
      return;
    }

    const lowerCaseTerm = term.toLowerCase()
    .replace(/á/g, 'a') // Use regex for more efficient replacements
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u');

    const filtered = doctors.filter((doctor) =>
      doctor.especialidad.toLowerCase()
        .replace(/á/g, 'a') // Use regex for more efficient replacements
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u')
        .includes(lowerCaseTerm)
    );
    setFilteredDoctors(filtered.map(doctor => new Doctor(doctor)));
  };

  const getAllDoctors = async () => {
    setIsLoading(true);
    try {
      const data = await fetchDoctors();
      if(data) {
        const doctorObjects = data.map(doctor => new Doctor(doctor));
        setDoctors(doctorObjects);
        setFilteredDoctors(doctorObjects);
      } else {
        console.warn("fetchDoctors returned no data."); // Handle the case where data is undefined
        setDoctors([]); // Or set an appropriate default value
        setFilteredDoctors([]);
        alert("No se encontraron médicos."); // Inform the user
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      alert('Error al obtener los medicos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (doctors && doctors.length > 0) {  // Check for both defined and not empty
      setFilteredDoctors(doctors);
      setIsLoading(false);
      return;
    }

    getAllDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors]);


  // Conditional rendering based on doctors being defined
  if (!doctors) {
    return <div>Loading doctors...</div>; // Or a more elegant placeholder
  }

  return (
    <MainLayout>
    <React.Fragment>
      <DoctorModal
        title="Información del Doctor (Botón Ver Info)"
        showModal={showModalDoctor}
        setShowModal={setShowModalDoctor}
      />
      <main>
        <section
          className="medical-team-section"
          style={{
            padding: '200px',
            backgroundSize: 'cover',
          }}
        >
                <h1>Nuestro Gran Equipo</h1>
                <p className="fs-4">
                  Somos profesionales del mejor país de Chile.
                  Somos excelentes carniceros, 
                  formados en las mejores carnicerias del mundo mundial.
                </p>
        </section>
        <section>
          <h2>Equipo de Carniceros</h2>
          <button
            className="btn btn-primary"
            onClick={async () => {
              try {
                await getAllDoctors();
              } catch (error) {
                alert(error);
                alert('Recargando doctores');
                getAllDoctors().then((error) => console.log(error));
              }
             }}
          >
          Recargar Lista
          </button>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Filtrar por especialidad"
            value={searchTerm} 
            onChange={(e) => filterBySpec(e.target.value)}
          />
          {
            isLoading ? 
              (<p>Cargando</p>) : 
              (<DoctorList className="mt-5" doctors={filteredDoctors} />)
          }
        </section>  
      </main>
    </React.Fragment>
    </MainLayout>
  );
}
