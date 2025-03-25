"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Image, Plus, Search, Shield, Users, Filter, ChevronLeft, ChevronRight } from "lucide-react"

import Sidebar from "../components/IssuerDashboard/Sidebar"
import Header from "../components/IssuerDashboard/Header"
import OverviewTab from "../components/IssuerDashboard/OverviewTab"
import GenerateCertificateTab from "../components/IssuerDashboard/GenerateCertificateTab"
import CertificateTable from "../components/IssuerDashboard/CertificateTable"

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
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <motion.div
                className="bg-slate-800 rounded-xl border border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold">All Certificates</h2>
                    <p className="text-sm text-slate-400">Manage all your issued certificates</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search certificates..."
                        className="bg-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        New Certificate
                      </button>
                    </div>
                  </div>
                </div>
                <CertificateTable recentCertificates={recentCertificates} />
                <div className="p-4 border-t border-slate-700 flex items-center justify-between">
                  <p className="text-sm text-slate-400">Showing 1-10 of 1,284 certificates</p>
                  <div className="flex items-center space-x-2">
                    <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-lg transition-colors">
                      1
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 rounded-lg transition-colors">
                      2
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 rounded-lg transition-colors">
                      3
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}