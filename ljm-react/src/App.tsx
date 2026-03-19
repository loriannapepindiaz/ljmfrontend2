// App.tsx
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

import { DestinationDetails } from "./features/destinationdetails/presentation/pages/DestinationDetails";
import DetailsSuitPage from "./features/details_suit/presentation/pages/DetailsSuitPage";

function App() {
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