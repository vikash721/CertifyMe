"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Image, Plus, Search, Shield, Users, Filter, ChevronLeft, ChevronRight } from "lucide-react"

import Sidebar from "../components/IssuerDashboard/Sidebar"
import Header from "../components/IssuerDashboard/Header"
import OverviewTab from "../components/IssuerDashboard/OverviewTab"
import GenerateCertificateTab from "../components/IssuerDashboard/GenerateCertificateTab"
import CertificatesTab from "../components/IssuerDashboard/CertificatesTab"
import TemplatesTab from "../components/IssuerDashboard/TemplatesTab"

export default function IssuerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [previewMode, setPreviewMode] = useState(false)
  const [formData, setFormData] = useState({
    recipientName: "John Doe",
    recipientEmail: "john.doe@example.com",
    courseTitle: "Advanced Blockchain Development",
    issueDate: "2023-12-15",
    issuedBy: "CertifyMe",
    certificateId: "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    additionalDetails: "Completed with distinction (95% score)",
  })

  const templates = [
    { id: 1, name: "Professional Blue", color: "blue" },
    { id: 2, name: "Executive Purple", color: "purple" },
    { id: 3, name: "Modern Teal", color: "teal" },
    { id: 4, name: "Classic Gold", color: "amber" },
  ]

  const recentCertificates = [
    {
      id: "CERT-8A72E5F9",
      recipient: "Emma Johnson",
      course: "Blockchain Fundamentals",
      date: "2023-12-01",
      status: "Active",
    },
    {
      id: "CERT-9B81F6G0",
      recipient: "Michael Smith",
      course: "Smart Contract Development",
      date: "2023-11-28",
      status: "Active",
    },
    {
      id: "CERT-7C63D4E8",
      recipient: "Sophia Williams",
      course: "Cryptocurrency Analysis",
      date: "2023-11-25",
      status: "Active",
    },
    {
      id: "CERT-6D54C3D7",
      recipient: "James Brown",
      course: "Blockchain Security",
      date: "2023-11-20",
      status: "Revoked",
    },
    { id: "CERT-5E45B2C6", recipient: "Olivia Davis", course: "DeFi Protocols", date: "2023-11-15", status: "Active" },
  ]

  const stats = [
    { title: "Total Certificates", value: "1,284", icon: FileText, color: "blue" },
    { title: "Active Certificates", value: "1,187", icon: Shield, color: "green" },
    { title: "Recipients", value: "943", icon: Users, color: "purple" },
    { title: "Templates", value: "12", icon: Image, color: "amber" },
  ]

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
  )
}