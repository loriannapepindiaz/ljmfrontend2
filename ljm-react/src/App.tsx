// App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import LoginPage from "./features/auth/presentation/components/LoginPage";
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


import { DestinationDetails } from "./features/destinationdetails/presentation/pages/DestinationDetails";
import DetailsSuitPage from "./features/details_suit/presentation/pages/DetailsSuitPage";

function App() {
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
        <Route path="/destinations" element={<DestinationsView />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* ✅ PERFIL */}
        <Route path="/perfil" element={<ProfilePage />} />

        {/* ✅ ADMIN - RESERVAS */}
        <Route path="/admin/reservas" element={<ReservationManagementPage />} />

        {/* ✅ ADMIN - DASHBOARD */}
        <Route path="/admin/dashboard" element={<DashboardOverviewPage />} />

        {/* ✅ ADMIN - CRUCEROS */}
        <Route path="/admin/cruceros" element={<CrucerosPage />} />

        <Route path="/admin/pasajeros" element={<PasajerosPage />} />

        <Route path="/admin/cabinas" element={<CabinasPage />} />

        <Route path="/admin/pagos" element={<PagosPage />} />

        <Route path="/admin/empleados" element={<EmpleadosPage />} />

        <Route path="/admin/reportes" element={<ReportesPage />} />

        <Route path="/admin/configuracion" element={<ConfiguracionPage />} />

        <Route path="/seguimiento-crucero" element={<SeguimientoCruceroPage />} />

         <Route path="/manage-booking" element={<ManageBookingPage />} />

         <Route path="/admin/empleados/agregar" element={<AgregarEmpleadoPage />} />

        <Route path="/offers" element={<OffersPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/personalization" element={<PersonalizationPage />} />
        <Route path="/details-suit" element={<DetailsSuitPage />} />
        <Route path="/destination-details" element={<DestinationDetails />} />
        <Route path="/details" element={<DestinationDetails />} />
        <Route path="*" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;