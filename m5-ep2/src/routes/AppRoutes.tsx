import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import EquipoMedico from "../pages/EquipoMedico";
import Vulnerabilities from "../pages/Vulnerabilities";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import {Doctor} from '../objects/Doctor';
import '../App.css';
import {DoctorContext} from '../context/DoctorContext';

const AppRoutes = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctor, setDoctor] = useState<Doctor>({} as unknown as Doctor);
  const [showModalDoctor, setShowModalDoctor] = useState(false);

  return (
    <AuthProvider>
      <Router>
      <DoctorContext.Provider
          value={{
            doctors,
            setDoctors,
            doctor,
            setDoctor,
            showModalDoctor,
            setShowModalDoctor,
          }}
        >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipo-medico"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <EquipoMedico />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vulnerabilities"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Vulnerabilities />
              </ProtectedRoute>
            }
          />
        </Routes>
      </DoctorContext.Provider>
      </Router>
      <div id="doctor-modal" />
    </AuthProvider>
  );
};

export default AppRoutes;
