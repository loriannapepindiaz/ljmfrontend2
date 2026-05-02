// App.tsx
import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { getStoredAdminSession } from "./lib/api";

// Páginas de autenticación
import LoginPage from "./features/auth/presentation/pages/LoginPage";
import RegisterPage from "./features/auth/presentation/pages/RegisterPage";
import AdminLoginPage from './features/auth/presentation/pages/AdminLoginPage';

// Páginas principales
import HomePage from "./features/home/presentation/pages/HomePage";
import DestinationsPage from "./features/destinations/presentation/pages/DestinationsPage";
import FleetPage from "./features/fleet/presentation/pages/FleetPage";
import PaymentPage from "./features/payment/presentation/pages/PaymentPage";
import ExperiencesPage from "./features/experiences/presentation/pages/ExperiencesPage";
import RoomPage from "./features/Room/presentation/pages/RoomPage";
import PersonalizationPage from "./features/personalization/presentation/pages/PersonalizationPage";
import PersonalizarEstanciaPage from "./features/personalizar-estancia/presentation/pages/PersonalizarEstanciaPage";
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

import AgregarCruceroPage from "./features/agregarcrucero/presentation/pages/AgregarCruceroPage";

import VoyageHistoryPage from "./features/voyayehistory/presentation/pages/VoyageHistoryPage";
import FacturaPage from "./features/factura/presentation/pages/FacturaPage";

import AcompanantePage from "./features/acompanante/presentation/pages/AnadirAcompanantePage";
import AnadirAcompanantePage from "./features/anadiracompanante/presentation/pages/AnadirAcompanantePage";
// Detalles
import { DestinationDetails } from "./features/destinationdetails/presentation/pages/DestinationDetails";
import DetailsSuitPage from "./features/details_suit/presentation/pages/DetailsSuitPage";
import BookingConfirmationPage from "./features/reservaconfirmada/presentation/pages/BookingConfirmationPage"
import VoyageReviewsPage from "./features/reviews/presentation/pages/VoyageReviewsPage"
import CoralImmersionPage from "./features/coralimmersion/presentation/pages/CoralImmersionPage";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const session = getStoredAdminSession();
  return session ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Ruta de registro */}
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/experiences/:slug" element={<CoralImmersionPage />} />
        <Route path="/experiences/inmersion-arrecifes-coral" element={<CoralImmersionPage />} />
        <Route path="/inmersion-arrecifes-coral" element={<CoralImmersionPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/personalization" element={<PersonalizationPage />} />
        <Route path="/personalizar-estancia" element={<PersonalizarEstanciaPage />} />

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

        <Route path="/admin/cruceros/agregar" element={<AdminRoute><AgregarCruceroPage /></AdminRoute>} />

        {/* Dashboard Admin */}
        <Route path="/admin/dashboard" element={<AdminRoute><DashboardOverviewPage /></AdminRoute>} />

        {/* Gestión de Reservas */}
        <Route path="/admin/reservas" element={<AdminRoute><ReservationManagementPage /></AdminRoute>} />

        {/* Gestión de Flota / Cruceros */}
        <Route path="/admin/cruceros" element={<AdminRoute><CrucerosPage /></AdminRoute>} />

        {/* Pasajeros */}
        <Route path="/admin/pasajeros" element={<AdminRoute><PasajerosPage /></AdminRoute>} />

        {/* Cabinas */}
        <Route path="/admin/cabinas" element={<AdminRoute><CabinasPage /></AdminRoute>} />

        {/* Pagos */}
        <Route path="/admin/pagos" element={<AdminRoute><PagosPage /></AdminRoute>} />

        {/* Empleados */}
        <Route path="/admin/empleados" element={<AdminRoute><EmpleadosPage /></AdminRoute>} />
        <Route path="/admin/empleados/agregar" element={<AdminRoute><AgregarEmpleadoPage /></AdminRoute>} />

        {/* Reportes */}
        <Route path="/admin/reportes" element={<AdminRoute><ReportesPage /></AdminRoute>} />

        {/* Configuración */}
        <Route path="/admin/configuracion" element={<AdminRoute><ConfiguracionPage /></AdminRoute>} />

        <Route path="/voyage-history" element={<VoyageHistoryPage />} />

        <Route path="/acompanante" element={<AcompanantePage />} />
        <Route path="/anadiracompanante" element={<AnadirAcompanantePage />} />
        <Route path="/factura" element={<FacturaPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        <Route path="/reviews" element={<VoyageReviewsPage />} />
        {/* Ruta por defecto (404) */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
