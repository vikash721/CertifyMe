import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IssuerDashboard from "./pages/IssuerDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Home />} />

      {/* Issuer Dashboard Route */}
      <Route path="/issuer-dashboard/*" element={<IssuerDashboard />} />

      {/* Catch-All Route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
