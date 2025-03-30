"use client";

import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import OverviewTab from "./OverviewTab";
import GenerateCertificateForm from "./GenerateCertificateForm";
import CertificatesTab from "./CertificatesTab";
import TemplatesTab from "./TemplatesTab";

export default function IssuerDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-900 text-white flex">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="p-6">
                    <Routes>
                        <Route path="/issuer-dashboard" element={<OverviewTab />} />
                        <Route path="/issuer-dashboard/generate-certificate" element={<GenerateCertificateForm />} />
                        <Route path="/issuer-dashboard/certificates" element={<CertificatesTab />} />
                        <Route path="/issuer-dashboard/templates" element={<TemplatesTab />} />
                        <Route path="*" element={<Navigate to="/issuer-dashboard" />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}