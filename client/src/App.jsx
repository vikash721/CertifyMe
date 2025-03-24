import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IssuerDashboard from "./pages/IssuerDashboard"

import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/issuer-dashboard" element={<IssuerDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
