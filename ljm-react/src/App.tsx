import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import LoginPage from "./features/auth/presentation/components/LoginPage";
import DestinationsView from "./features/destinations/presentation/components/DestinationsView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/home" element={<LoginPage />} />

        {/* NUEVA RUTA */}
        <Route path="/destinations" element={<DestinationsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
