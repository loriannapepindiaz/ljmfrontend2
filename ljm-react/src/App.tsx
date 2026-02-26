// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import LoginPage from "./features/auth/presentation/components/LoginPage";
import DestinationsView from "./features/destinations/presentation/components/DestinationsView";
import FleetPage from "./features/fleet/presentation/pages/FleetPage";
import PaymentPage from "./features/payment/presentation/pages/PaymentPage"; 

// ✅ Importación de Experiencias
import ExperiencesPage from "./features/experiences/presentation/pages/ExperiencesPage";

// ✅ NUEVA IMPORTACIÓN DE ROOM (Basada en tu estructura de carpetas)
import RoomPage from "./features/Room/presentation/pages/RoomPage";

// Importamos la nueva página de detalles de destino
import { DestinationDetails } from "./features/destinationdetails/presentation/pages/DestinationDetails";

// Mantengo el viejo por si lo necesitas temporalmente
import DetailsSuitPage from "./features/details_suit/presentation/pages/DetailsSuitPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS ORIGINALES */}
        <Route path="/" element={<SigninPage />} />
        <Route path="/home" element={<LoginPage />} />
        <Route path="/destinations" element={<DestinationsView />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* ✅ RUTA DE EXPERIENCIAS */}
        <Route path="/experiences" element={<ExperiencesPage />} />

        {/* ✅ NUEVA RUTA DE PERSONALIZACIÓN (ROOM) */}
        <Route path="/room" element={<RoomPage />} />

        {/* RUTAS DE DETALLES */}
        <Route path="/details-suit" element={<DetailsSuitPage />} />

        {/* NUEVA RUTA PRINCIPAL → usa esta para los destinos */}
        <Route path="/destination-details" element={<DestinationDetails />} />

        {/* Rutas temporales / de transición */}
        <Route path="/details" element={<DestinationDetails />} />
        <Route path="/gallery" element={<DestinationDetails />} />

        {/* Catch-all */}
        <Route path="*" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;