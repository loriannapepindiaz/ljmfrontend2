// App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas de autenticación
import SigninPage from "./pages/SigninPage";
import LoginPage from "./features/auth/presentation/components/LoginPage";
import Register from "./features/auth/presentation/components/register";

// Páginas principales
import DestinationsView from "./features/destinations/presentation/components/DestinationsView";
import FleetPage from "./features/fleet/presentation/pages/FleetPage";
import PaymentPage from "./features/payment/presentation/pages/PaymentPage";
import ExperiencesPage from "./features/experiences/presentation/pages/ExperiencesPage";
import RoomPage from "./features/Room/presentation/pages/RoomPage";
import PersonalizationPage from "./features/personalization/presentation/pages/PersonalizationPage";
import OffersPage from "./features/offers/presentation/pages/OffersPage";

// ✅ PERFIL
import ProfilePage from "./features/perfil/presentation/pages/ProfilePage";

// ✅ ADMIN - GESTIÓN DE RESERVAS
import ReservationManagementPage from "./features/gestionreserva/presentation/pages/ReservationManagementPage";

// ✅ ADMIN - DASHBOARD OVERVIEW
import DashboardOverviewPage from "./features/dashboardoverview/presentation/pages/DashboardOverviewPage";

// ✅ ADMIN - CRUCEROS
import CrucerosPage from "./features/gestionflota/presentation/pages/CrucerosPage";

import PasajerosPage from "./features/pasajeros/presentation/pages/PasajerosPage";

// ✅ ADMIN - CABINAS
import CabinasPage from "./features/gestioncabinas/presentation/pages/CabinasPage";

// ✅ ADMIN - PAGOS
import PagosPage from "./features/gestionpago/presentation/pages/PagosPage";

// ✅ ADMIN - EMPLEADOS
import EmpleadosPage from "./features/employeemanagement/presentation/pages/EmpleadosPage";

// ✅ ADMIN - REPORTES
import ReportesPage from "./features/reportes/presentation/pages/ReportesPage";

// ✅ ADMIN - CONFIGURACIÓN
import ConfiguracionPage from "./features/configuration/presentation/pages/ConfiguracionPage";

// ✅ SEGUIMIENTO DE CRUCERO
import SeguimientoCruceroPage from "./features/seguimientocrucero/presentation/pages/SeguimientoCruceroPage";

// ✅ MANAGE BOOKING
import ManageBookingPage from "./features/manageyourbooking/presentation/pages/ManageBookingPage";

// ✅ AGREGAR EMPLEADO
import AgregarEmpleadoPage from "./features/agregarempleado/presentation/pages/AgregarEmpleadoPage";

// ✅ DESCRIPCIÓN CRUCERO
import DescripcionCruceroPage from "./features/descripcioncrucero/presentation/pages/DescripcionCruceroPage";

import AdminLoginPage from './features/auth/presentation/components/AdminLoginPage';

import AgregarCruceroPage from "./features/agregarcrucero/presentation/pages/AgregarCruceroPage";

// Detalles
import { DestinationDetails } from "./features/destinationdetails/presentation/pages/DestinationDetails";
import DetailsSuitPage from "./features/details_suit/presentation/pages/DetailsSuitPage";

function App() {
  // Manejo del tema oscuro/claro desde localStorage
  useEffect(() => {
    const tema = localStorage.getItem('tema');
    if (tema === 'oscuro') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/home" element={<LoginPage />} />
        
        {/* Ruta de registro */}
        <Route path="/register" element={<Register />} />

        <Route path="/destinations" element={<DestinationsView />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/personalization" element={<PersonalizationPage />} />

        {/* Perfil de usuario */}
        <Route path="/perfil" element={<ProfilePage />} />

        {/* Detalles */}
        <Route path="/details-suit" element={<DetailsSuitPage />} />
        <Route path="/destination-details" element={<DestinationDetails />} />
        <Route path="/details" element={<DestinationDetails />} />

        {/* Seguimiento y gestión de reserva del usuario */}
        <Route path="/seguimiento-crucero" element={<SeguimientoCruceroPage />} />
        <Route path="/manage-booking" element={<ManageBookingPage />} />
        <Route path="/crucero/:id" element={<DescripcionCruceroPage />} />

        {/* ==================== RUTAS DE ADMINISTRADOR ==================== */}
        
        <Route path="/admin" element={<AdminLoginPage />} />  

        <Route path="/admin/cruceros/agregar" element={<AgregarCruceroPage />} />

        {/* Dashboard Admin */}
        <Route path="/admin/dashboard" element={<DashboardOverviewPage />} />

        {/* Gestión de Reservas */}
        <Route path="/admin/reservas" element={<ReservationManagementPage />} />

        {/* Gestión de Flota / Cruceros */}
        <Route path="/admin/cruceros" element={<CrucerosPage />} />

        {/* Pasajeros */}
        <Route path="/admin/pasajeros" element={<PasajerosPage />} />

        {/* Cabinas */}
        <Route path="/admin/cabinas" element={<CabinasPage />} />

        {/* Pagos */}
        <Route path="/admin/pagos" element={<PagosPage />} />

        {/* Empleados */}
        <Route path="/admin/empleados" element={<EmpleadosPage />} />
        <Route path="/admin/empleados/agregar" element={<AgregarEmpleadoPage />} />

        {/* Reportes */}
        <Route path="/admin/reportes" element={<ReportesPage />} />

        {/* Configuración */}
        <Route path="/admin/configuracion" element={<ConfiguracionPage />} />

        {/* Ruta por defecto (404) */}
        <Route path="*" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;