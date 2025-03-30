import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/IssuerDashboard/Sidebar";
import Header from "../components/IssuerDashboard/Header";
import OverviewTab from "../components/IssuerDashboard/OverviewTab";
import GenerateCertificateTab from "../components/IssuerDashboard/GenerateCertificateForm";
import GenerateCertificateForm from "../components/IssuerDashboard/GenerateCertificateTab";
import TemplatesTab from "../components/IssuerDashboard/TemplatesTab";

export default function IssuerDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <Header />
        <div className="p-6">
          <Routes>
            {/* Nested Routes */}
            <Route path="/" element={<OverviewTab />} />
            <Route path="generate-certificate" element={<GenerateCertificateTab />} />
            <Route path="certificates" element={<CertificateForm />} />
            <Route path="templates" element={<TemplatesTab />} />
            <Route path="*" element={<Navigate to="/issuer-dashboard" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
