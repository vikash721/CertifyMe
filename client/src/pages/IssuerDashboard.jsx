"use client";

import { useState, useEffect } from "react";
import { FileText, Image, Shield, Users } from "lucide-react";

import Sidebar from "../components/IssuerDashboard/Sidebar";
import Header from "../components/IssuerDashboard/Header";
import OverviewTab from "../components/IssuerDashboard/OverviewTab";
import GenerateCertificateTab from "../components/IssuerDashboard/GenerateCertificateTab";
import CertificatesTab from "../components/IssuerDashboard/CertificatesTab";
import TemplatesTab from "../components/IssuerDashboard/TemplatesTab";

export default function IssuerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: "John Doe",
    recipientEmail: "john.doe@example.com",
    achievementTitle: "Advanced Blockchain Development",
    issueDate: "2023-12-15",
    issuedBy: "CertifyMe",
    certificateId: "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    additionalDetails: "Completed with distinction (95% score)",
  });

  const [stats, setStats] = useState([]);
  const [recentCertificates, setRecentCertificates] = useState([]);

  const templates = [
    { id: 1, name: "Professional Blue", color: "blue" },
    { id: 2, name: "Executive Purple", color: "purple" },
    { id: 3, name: "Modern Teal", color: "teal" },
    { id: 4, name: "Classic Gold", color: "amber" },
  ];

  // Fetch dashboard data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/certificates/dashboard");
        const data = await response.json();
        setStats(data.stats);
        setRecentCertificates(data.recentCertificates);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} />
        <div className="p-6">
          {activeTab === "overview" && <OverviewTab stats={stats} recentCertificates={recentCertificates} />}
          {activeTab === "generate" && (
            <GenerateCertificateTab
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
              formData={formData}
              setFormData={setFormData}
              templates={templates}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          )}
          {activeTab === "certificates" && <CertificatesTab recentCertificates={recentCertificates} />}
          {activeTab === "templates" && <TemplatesTab />}
        </div>
      </main>
    </div>
  );
}