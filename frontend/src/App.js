import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Login from "./modules/Login/Login";
import AdminLayout from "./components/layouts/AdminLayout";
import PrestamistaLayout from "./components/layouts/PrestamistaLayout";
import PrestatarioLayout from "./components/layouts/PrestatarioLayout";
import SoporteLayout from "./components/layouts/SoporteLayout";

// Módulos del Administrador
import DashboardAdmin from "./modules/Admin/Dashboard/Dashboard";
import Usuarios from "./modules/Admin/Usuarios/Usuarios";
import ProyectosAdmin from "./modules/Admin/Proyectos/Proyectos";
import TicketsAdmin from "./modules/Admin/Tickets/Tickets";
import Inversiones from "./modules/Admin/Inversiones/Inversiones";

// Módulos del Prestamista
import DashboardPrestamista from "./modules/Prestamista/DashboardPrestamista/Dashboard";
import SeguimientoPrestamista from "./modules/Prestamista/SeguimientoPrestamista/Seguimiento";
import ProyectosPrestamista from "./modules/Prestamista/ProyectosPrestamista/Proyectos";

// Módulos del Prestatario
import DashboardPrestatario from "./modules/Prestatario/DashboardPrestatario/Dashboard";
import SeguimientoPrestatario from "./modules/Prestatario/SeguimientoPrestatario/Seguimiento";
import ProyectosPrestatario from "./modules/Prestatario/ProyectosPrestatario/Proyectos";

// Módulos del Soporte
import DashboardSoporte from "./modules/Soporte/DashboardSoporte/Dashboard";
import ProyectosSoporte from "./modules/Soporte/ProyectoSoporte/Proyecto";
import TicketsSoporte from "./modules/Soporte/TicketsSoporte/TicKets";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    localStorage.setItem("userRole", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
    navigate(`/${userRole.toLowerCase()}/dashboard`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRole("");
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />

      {isAuthenticated && role === "Administrador" && (
        <Route
          path="/administrador/*"
          element={
            <AdminLayout onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<DashboardAdmin />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="proyectos" element={<ProyectosAdmin />} />
                <Route path="tickets" element={<TicketsAdmin />} />
                <Route path="inversiones" element={<Inversiones />} />
              </Routes>
            </AdminLayout>
          }
        />
      )}

      {isAuthenticated && role === "Prestamista" && (
        <Route
          path="/prestamista/*"
          element={
            <PrestamistaLayout onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<DashboardPrestamista />} />
                <Route path="seguimiento" element={<SeguimientoPrestamista />} />
                <Route path="proyectos" element={<ProyectosPrestamista />} />
              </Routes>
            </PrestamistaLayout>
          }
        />
      )}

      {isAuthenticated && role === "Prestatario" && (
        <Route
          path="/prestatario/*"
          element={
            <PrestatarioLayout onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<DashboardPrestatario />} />
                <Route path="seguimiento" element={<SeguimientoPrestatario />} />
                <Route path="proyectos" element={<ProyectosPrestatario />} />
              </Routes>
            </PrestatarioLayout>
          }
        />
      )}

      {isAuthenticated && role === "Soporte" && (
        <Route
          path="/soporte/*"
          element={
            <SoporteLayout onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<DashboardSoporte />} />
                <Route path="proyectos" element={<ProyectosSoporte />} />
                <Route path="tickets" element={<TicketsSoporte />} />
              </Routes>
            </SoporteLayout>
          }
        />
      )}

      {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}

      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
