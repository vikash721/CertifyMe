"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Bell,
  Clock,
  Download,
  FileText,
  Hexagon,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Shield,
  Users,
  X,
  RefreshCcw,
  Upload,
  Filter,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { FiCheck, FiCopy, FiEye } from "react-icons/fi"

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
    expiryDate: "2025-12-15",
    certificateId: "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    additionalDetails: "Completed with distinction (95% score)",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
      {/* Sidebar */}
      <aside
        className={`bg-slate-800 fixed inset-y-0 z-50 transition-all duration-300 ease-in-out ${sidebarOpen ? "left-0" : "-left-64"} lg:left-0 w-64 border-r border-slate-700`}
      >
        <div className="p-4 flex items-center border-b border-slate-700">
         
          <span className="ml-2 text-xl font-bold">CertifyMe</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="font-bold">JD</span>
            </div>
            <div className="ml-3">
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
          <nav className="space-y-1">
            <button
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "overview" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </button>
            <button
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "generate" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
              onClick={() => setActiveTab("generate")}
            >
              <Plus className="h-5 w-5 mr-3" />
              Generate Certificate
            </button>
            <button
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "certificates" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
              onClick={() => setActiveTab("certificates")}
            >
              <FileText className="h-5 w-5 mr-3" />
              Certificates
            </button>
            <button
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "templates" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
              onClick={() => setActiveTab("templates")}
            >
              <Image className="h-5 w-5 mr-3" />
              Templates
            </button>
            <button
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "settings" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
          <button className="flex items-center w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "generate" && "Generate Certificate"}
                {activeTab === "certificates" && "Manage Certificates"}
                {activeTab === "templates" && "Certificate Templates"}
                {activeTab === "settings" && "Settings"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 md:w-64"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
              <button className="relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-slate-800 rounded-xl p-6 border border-slate-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div className={`h-12 w-12 rounded-lg bg-${stat.color}-600/20 flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-slate-400">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  className="bg-slate-800 rounded-xl border border-slate-700 lg:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="p-6 border-b border-slate-700">
                    <h2 className="text-lg font-bold">Certificate Issuance</h2>
                    <p className="text-sm text-slate-400">Last 30 days</p>
                  </div>
                  <div className="p-6 h-64 flex items-center justify-center">
                    <BarChart3 className="h-full w-full text-slate-600" />
                  </div>
                </motion.div>

                <motion.div
                  className="bg-slate-800 rounded-xl border border-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <div className="p-6 border-b border-slate-700">
                    <h2 className="text-lg font-bold">Recent Activity</h2>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center mt-1">
                            <FileText className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">
                              Certificate issued to {["Emma", "Michael", "Sophia", "James"][index]}
                            </p>
                            <div className="flex items-center text-xs text-slate-400 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {["2 hours", "5 hours", "1 day", "2 days"][index]} ago
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="bg-slate-800 rounded-xl border border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">Recent Certificates</h2>
                    <p className="text-sm text-slate-400">Manage your recently issued certificates</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    New Certificate
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-sm">
                        <th className="p-4 font-medium">Certificate ID</th>
                        <th className="p-4 font-medium">Recipient</th>
                        <th className="p-4 font-medium">Course</th>
                        <th className="p-4 font-medium">Issue Date</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCertificates.map((cert, index) => (
                        <tr key={index} className="border-t border-slate-700">
                          <td className="p-4 font-mono text-sm">{cert.id}</td>
                          <td className="p-4">{cert.recipient}</td>
                          <td className="p-4">{cert.course}</td>
                          <td className="p-4 text-slate-400">{cert.date}</td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cert.status === "Active" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}
                            >
                              {cert.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button className="text-slate-400 hover:text-white transition-colors">
                                <FiEye className="h-4 w-4" />
                              </button>
                              <button className="text-slate-400 hover:text-white transition-colors">
                                <Download className="h-4 w-4" />
                              </button>
                              <button className="text-slate-400 hover:text-white transition-colors">
                                <FiCopy className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}

          {/* Generate Certificate Tab */}
          {activeTab === "generate" && (
            <div className="space-y-6">
              {previewMode ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800 rounded-xl border border-slate-700 p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Certificate Preview</h2>
                    <button
                      onClick={() => setPreviewMode(false)}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Close Preview
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <div
                      className={`relative w-full max-w-2xl aspect-[1.4/1] bg-gradient-to-r ${
                        selectedTemplate === 1
                          ? "from-blue-900 to-blue-700"
                          : selectedTemplate === 2
                            ? "from-purple-900 to-purple-700"
                            : selectedTemplate === 3
                              ? "from-teal-900 to-teal-700"
                              : "from-amber-900 to-amber-700"
                      } rounded-xl p-8 text-white shadow-lg`}
                    >
                      <div className="absolute inset-0 opacity-10">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-40 w-40 rounded-full bg-white"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              opacity: 0.1 + Math.random() * 0.3,
                              transform: `scale(${0.5 + Math.random() * 1.5})`,
                            }}
                          />
                        ))}
                      </div>

                      <div className="relative z-10 h-full flex flex-col items-center justify-between text-center">
                        <div>
                          <div className="flex items-center justify-center mb-2">
                            <Hexagon className="h-8 w-8 mr-2" />
                            <h1 className="text-2xl font-bold">CertChain</h1>
                          </div>
                          <p className="text-sm opacity-80">Blockchain-Verified Certificate of Completion</p>
                        </div>

                        <div className="my-6">
                          <h2 className="text-4xl font-serif mb-2">Certificate of Achievement</h2>
                          <p className="text-lg mb-4">This certifies that</p>
                          <p className="text-3xl font-bold mb-4">{formData.recipientName}</p>
                          <p className="text-lg mb-4">has successfully completed the course</p>
                          <p className="text-2xl font-bold mb-6">{formData.courseTitle}</p>
                          <p className="text-sm opacity-80">{formData.additionalDetails}</p>
                        </div>

                        <div className="grid grid-cols-3 w-full text-sm">
                          <div>
                            <p className="font-bold">Issue Date</p>
                            <p>{formData.issueDate}</p>
                          </div>
                          <div>
                            <p className="font-bold">Certificate ID</p>
                            <p className="font-mono">{formData.certificateId}</p>
                          </div>
                          <div>
                            <p className="font-bold">Expiry Date</p>
                            <p>{formData.expiryDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Issue on Blockchain
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <motion.div
                    className="bg-slate-800 rounded-xl border border-slate-700 lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 border-b border-slate-700">
                      <h2 className="text-lg font-bold">Certificate Information</h2>
                      <p className="text-sm text-slate-400">Enter the details for the new certificate</p>
                    </div>
                    <div className="p-6">
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Recipient Name</label>
                            <input
                              type="text"
                              name="recipientName"
                              value={formData.recipientName}
                              onChange={handleInputChange}
                              className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Recipient Email</label>
                            <input
                              type="email"
                              name="recipientEmail"
                              value={formData.recipientEmail}
                              onChange={handleInputChange}
                              className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Course/Achievement Title</label>
                          <input
                            type="text"
                            name="courseTitle"
                            value={formData.courseTitle}
                            onChange={handleInputChange}
                            className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Issue Date</label>
                            <input
                              type="date"
                              name="issueDate"
                              value={formData.issueDate}
                              onChange={handleInputChange}
                              className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date (Optional)</label>
                            <input
                              type="date"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Certificate ID</label>
                          <div className="flex">
                            <input
                              type="text"
                              name="certificateId"
                              value={formData.certificateId}
                              onChange={handleInputChange}
                              className="w-full bg-slate-700 rounded-l-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                              readOnly
                            />
                            <button
                              type="button"
                              className="bg-slate-600 hover:bg-slate-500 px-4 rounded-r-lg flex items-center justify-center transition-colors"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  certificateId: "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
                                }))
                              }
                            >
                              <RefreshCcw className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Auto-generated unique identifier</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Additional Details (Optional)</label>
                          <textarea
                            name="additionalDetails"
                            value={formData.additionalDetails}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          ></textarea>
                        </div>

                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Save as Draft
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewMode(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <FiEye className="h-4 w-4 mr-2" />
                            Preview Certificate
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-slate-800 rounded-xl border border-slate-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="p-6 border-b border-slate-700">
                      <h2 className="text-lg font-bold">Certificate Template</h2>
                      <p className="text-sm text-slate-400">Select a template design</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {templates.map((template) => (
                          <div
                            key={template.id}
                            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id ? "ring-2 ring-blue-500" : "hover:opacity-80"}`}
                            onClick={() => setSelectedTemplate(template.id)}
                          >
                            <div
                              className={`h-24 bg-gradient-to-r from-${template.color}-900 to-${template.color}-700`}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <h3 className="font-bold text-white">{template.name}</h3>
                                </div>
                              </div>
                            </div>
                            {selectedTemplate === template.id && (
                              <div className="absolute top-2 right-2 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <FiCheck className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-3">Advanced Options</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Include QR Code</label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input type="checkbox" id="toggle-qr" className="sr-only peer" defaultChecked />
                              <div className="h-4 w-10 bg-slate-600 rounded-full peer peer-checked:bg-blue-600"></div>
                              <div className="absolute w-6 h-6 bg-white rounded-full -left-1 -top-1 transition-all transform peer-checked:translate-x-5"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Add Digital Signature</label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input type="checkbox" id="toggle-signature" className="sr-only peer" defaultChecked />
                              <div className="h-4 w-10 bg-slate-600 rounded-full peer peer-checked:bg-blue-600"></div>
                              <div className="absolute w-6 h-6 bg-white rounded-full -left-1 -top-1 transition-all transform peer-checked:translate-x-5"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Enable Blockchain Verification</label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input type="checkbox" id="toggle-blockchain" className="sr-only peer" defaultChecked />
                              <div className="h-4 w-10 bg-slate-600 rounded-full peer peer-checked:bg-blue-600"></div>
                              <div className="absolute w-6 h-6 bg-white rounded-full -left-1 -top-1 transition-all transform peer-checked:translate-x-5"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-slate-700">
                        <h3 className="text-sm font-medium mb-3">Batch Generation</h3>
                        <p className="text-xs text-slate-400 mb-3">
                          Upload a CSV file to generate multiple certificates at once
                        </p>
                        <button className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload CSV File
                        </button>
                        <a href="#" className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block">
                          Download CSV Template
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {/* Certificates Tab */}
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
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-sm">
                        <th className="p-4 font-medium">Certificate ID</th>
                        <th className="p-4 font-medium">Recipient</th>
                        <th className="p-4 font-medium">Course</th>
                        <th className="p-4 font-medium">Issue Date</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...recentCertificates, ...recentCertificates].map((cert, index) => (
                        <tr key={index} className="border-t border-slate-700">
                          <td className="p-4 font-mono text-sm">{cert.id}</td>
                          <td className="p-4">{cert.recipient}</td>
                          <td className="p-4">{cert.course}</td>
                          <td className="p-4 text-slate-400">{cert.date}</td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cert.status === "Active" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}
                            >
                              {cert.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button className="text-slate-400 hover:text-white transition-colors">
                                <FiEye className="h-4 w-4" />
                              </button>
                              <button className="text-slate-400 hover:text-white transition-colors">
                                <Download className="h-4 w-4" />
                              </button>
                              <button className="text-slate-400 hover:text-white transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-slate-400 hover:text-white transition-colors">
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

