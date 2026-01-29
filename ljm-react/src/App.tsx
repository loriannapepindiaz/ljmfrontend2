import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import LoginPage from "./features/auth/presentation/components/LoginPage";
import DestinationsView from "./features/destinations/presentation/components/DestinationsView";
import FleetPage from "./features/fleet/presentation/pages/FleetPage";
import PaymentPage from "./features/payment/presentation/pages/PaymentPage"; 
import DetailsSuitPage from "./features/details_suit/presentation/pages/DetailsSuitPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/home" element={<LoginPage />} />

       
        <Route path="/destinations" element={<DestinationsView />} />
        <Route path="/fleet" element={<FleetPage />} />

        {/* Nueva ruta para Pago */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/details-suit" element={<DetailsSuitPage />} />
        {/* Opcional: si quieres una URL más descriptiva */}
        {/* <Route path="/our-fleet" element={<FleetPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;