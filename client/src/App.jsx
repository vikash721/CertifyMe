import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import IssuerDashboard from "./pages/IssuerDashboard";
import OverviewTab from "./components/IssuerDashboard/OverviewTab";
import GenerateCertificateTab from "./components/IssuerDashboard/GenerateCertificateTab";
import CertificatesTab from "./components/IssuerDashboard/CertificatesTab";
import TemplatesTab from "./components/IssuerDashboard/TemplatesTab";
import SettingsTab from "./components/IssuerDashboard/SettingsTab";
import NotFound from "./pages/NotFound";

import BatchCertificateGnerate from "./components/IssuerDashboard/BatchCertificateGeneration";
import BatchUpload from "./components/csv-parser/BatchUpload";
import TemplatesPage from "./components/IssuerDashboard/Templates/CertificateTemplates";
import PaymentModal from "./components/payment/PaymentModal";

import MainCertWallet from "./components/certificate-wallet/abcd";
import MarketPlaceCover from "./components/marketplace/MarketPlaceCover";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/issuer-dashboard" element={<IssuerDashboard />}>
        <Route path="overview" element={<OverviewTab />} />
        <Route path="generate" element={<GenerateCertificateTab />} />
        <Route path="certificates" element={<CertificatesTab />} />
        <Route path="templates" element={<TemplatesTab />} />
        <Route path="settings" element={<SettingsTab />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/batch" element={<BatchCertificateGnerate />} />
      <Route path="/test" element={<BatchUpload />} />
      <Route path="/template" element={<TemplatesPage />} />
      <Route path="/pay" element={<PaymentModal />} />
      <Route path="/user-wallet" element={<MainCertWallet />} />
      <Route path="/marketplace" element={<MarketPlaceCover />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}