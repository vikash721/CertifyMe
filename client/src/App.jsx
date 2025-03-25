import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import IssuerDashboard from "./pages/IssuerDashboard"

import NotFound from "./pages/NotFound";

import BatchCertificateGnerate from "./components/IssuerDashboard/BatchCertificateGeneration";
import BatchUpload from "./components/csv-parser/BatchUpload";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/issuer-dashboard" element={<IssuerDashboard />} />
      <Route path="/batch" element={<BatchCertificateGnerate/>} />
      <Route path="/test" element={<BatchUpload/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
