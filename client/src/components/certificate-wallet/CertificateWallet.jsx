"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Award,
  Calendar,
  ChevronDown,
  Download,
  ExternalLink,
  Eye,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Search,
  Share2,
  Shield,
  Star,
  Tag,
  TrendingUp,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function WalletPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [sortBy, setSortBy] = useState("newest")

  // Mock certificates data
  const certificates = [
    {
      id: "CERT-8A72E5F9",
      title: "Blockchain Fundamentals",
      issuer: "Blockchain Academy",
      issueDate: "2023-12-01",
      expiryDate: "2025-12-01",
      credentialType: "Course Completion",
      skills: ["Blockchain", "Cryptocurrency", "Smart Contracts"],
      image: "https://media.licdn.com/dms/image/v2/D5622AQHkBjBloTo-Qg/feedshare-shrink_800/feedshare-shrink_800/0/1732548464514?e=2147483647&v=beta&t=ReJ8pDKkhgJBadRPlOixU6b0shtp0U4xC48xPRhreZY",
      status: "active",
      verified: true,
      featured: true,
    },
    {
      id: "CERT-9B81F6G0",
      title: "Smart Contract Development",
      issuer: "DeFi Institute",
      issueDate: "2023-11-15",
      expiryDate: "2025-11-15",
      credentialType: "Professional Certificate",
      skills: ["Solidity", "Ethereum", "Web3.js"],
      image: "https://101blockchains.com/wp-content/uploads/2022/08/Smart-Contract-Development-.png",
      status: "active",
      verified: true,
      featured: false,
    },
    {
      id: "CERT-7C63D4E8",
      title: "Cryptocurrency Analysis",
      issuer: "Crypto Trading School",
      issueDate: "2023-10-20",
      expiryDate: "2025-10-20",
      credentialType: "Course Completion",
      skills: ["Technical Analysis", "Market Research", "Risk Management"],
      image: "https://media.licdn.com/dms/image/v2/D5622AQEWXAv7lyxp7g/feedshare-shrink_800/feedshare-shrink_800/0/1706309514572?e=2147483647&v=beta&t=_URwhcJVv2tiwFruKxxGtgJFyXgRvKcbVFtOlYYsZ-E",
      status: "active",
      verified: true,
      featured: false,
    },
    {
      id: "CERT-6D54C3D7",
      title: "Blockchain Security",
      issuer: "Cybersecurity Institute",
      issueDate: "2023-09-05",
      expiryDate: "2025-09-05",
      credentialType: "Professional Certificate",
      skills: ["Security Auditing", "Penetration Testing", "Cryptography"],
      image: "https://media.licdn.com/dms/image/v2/D4E22AQF_e4BMegieuQ/feedshare-shrink_800/feedshare-shrink_800/0/1731173867477?e=2147483647&v=beta&t=MiOq1n-mJKKaU9fNe3EsvRhpSC7USpCOEa0ZlYCC3Pk",
      status: "expired",
      verified: true,
      featured: false,
    },
    {
      id: "CERT-5E45B2C6",
      title: "DeFi Protocols",
      issuer: "Decentralized Finance Academy",
      issueDate: "2023-08-12",
      expiryDate: "2025-08-12",
      credentialType: "Specialization",
      skills: ["Yield Farming", "Liquidity Pools", "Tokenomics"],
      image: "https://app.simplecert.net/api/recipients/3825395/image/certificate.png",
      status: "active",
      verified: true,
      featured: true,
    },
  ]

  // Filter certificates based on active tab and search term
  const filteredCertificates = certificates.filter((cert) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && cert.status === "active") ||
      (activeTab === "expired" && cert.status === "expired") ||
      (activeTab === "featured" && cert.featured)

    const matchesSearch =
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  // Sort certificates
  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.issueDate) - new Date(a.issueDate)
    } else if (sortBy === "oldest") {
      return new Date(a.issueDate) - new Date(b.issueDate)
    } else if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate)
  }

  const handleCloseDetails = () => {
    setSelectedCertificate(null)
  }

  return (








    

    
    <div className="p-6 text-white">
      {selectedCertificate ? (
        <CertificateDetails certificate={selectedCertificate} onClose={handleCloseDetails} />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center space-x-3">
              <Link
                to="/marketplace"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Explore Marketplace
              </Link>
            </div>
          </div>


          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-bold mb-4">Certificate Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                    <Award className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Certificates</p>
                    <p className="text-xl font-bold">{certificates.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Active Certificates</p>
                    <p className="text-xl font-bold">
                      {certificates.filter((cert) => cert.status === "active").length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3">
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Featured Certificates</p>
                    <p className="text-xl font-bold">{certificates.filter((cert) => cert.featured).length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center mr-3">
                    <Tag className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Unique Skills</p>
                    <p className="text-xl font-bold">{new Set(certificates.flatMap((cert) => cert.skills)).size}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>





          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex space-x-1 bg-slate-700 p-1 rounded-lg">
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "all" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "active" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("active")}
                >
                  Active
                </button>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "expired" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("expired")}
                >
                  Expired
                </button>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "featured" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("featured")}
                >
                  Featured
                </button>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <button
                      className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors flex items-center"
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      <Filter className="h-4 w-4" />
                    </button>
                    {filterOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg z-10 p-2">
                        <div className="p-2">
                          <h3 className="text-sm font-medium mb-2">Sort By</h3>
                          <div className="space-y-1">
                            <button
                              className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                                sortBy === "newest" ? "bg-slate-600" : "hover:bg-slate-600"
                              }`}
                              onClick={() => setSortBy("newest")}
                            >
                              Newest First
                            </button>
                            <button
                              className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                                sortBy === "oldest" ? "bg-slate-600" : "hover:bg-slate-600"
                              }`}
                              onClick={() => setSortBy("oldest")}
                            >
                              Oldest First
                            </button>
                            <button
                              className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                                sortBy === "alphabetical" ? "bg-slate-600" : "hover:bg-slate-600"
                              }`}
                              onClick={() => setSortBy("alphabetical")}
                            >
                              Alphabetical
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex bg-slate-700 p-1 rounded-lg">
                    <button
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === "grid" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                      onClick={() => setViewMode("grid")}
                      title="Grid View"
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === "list" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                      onClick={() => setViewMode("list")}
                      title="List View"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {sortedCertificates.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">No certificates found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCertificates.map((certificate) => (
                  <CertificateCard
                    key={certificate.id}
                    certificate={certificate}
                    onClick={() => handleCertificateClick(certificate)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedCertificates.map((certificate) => (
                  <CertificateListItem
                    key={certificate.id}
                    certificate={certificate}
                    onClick={() => handleCertificateClick(certificate)}
                  />
                ))}
              </div>
            )}
          </div>

          
        </div>
      )}
    </div>
  )
}

function CertificateCard({ certificate, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-slate-700 rounded-xl overflow-hidden border border-slate-600 flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-40 bg-slate-600">
        <img
          src={certificate.image || "/placeholder.svg"}
          alt={certificate.title}
          className="w-full h-full object-cover"
        />
        {certificate.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </div>
        )}
        {certificate.verified && (
          <div className="absolute bottom-2 right-2 bg-green-500/80 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
            <Shield className="h-3 w-3 mr-1" />
            Verified
          </div>
        )}
      </div>

      <div className="p-4 flex-grow">
        <h3 className="font-bold text-white mb-1">{certificate.title}</h3>
        <p className="text-sm text-slate-400 mb-2">Issued by {certificate.issuer}</p>

        <div className="flex items-center text-xs text-slate-400 mb-3">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {certificate.skills.slice(0, 2).map((skill, index) => (
            <span key={index} className="bg-slate-600 text-slate-300 text-xs px-2 py-0.5 rounded-full">
              {skill}
            </span>
          ))}
          {certificate.skills.length > 2 && (
            <span className="bg-slate-600 text-slate-300 text-xs px-2 py-0.5 rounded-full">
              +{certificate.skills.length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between text-xs border-t border-slate-600 mt-2">
        <span
          className={`px-2 py-0.5 rounded-full ${
            certificate.status === "active" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
          }`}
        >
          {certificate.status === "active" ? "Active" : "Expired"}
        </span>
        <button
          className="text-slate-400 hover:text-white transition-colors p-1"
          onClick={(e) => {
            e.stopPropagation()
            // Handle more options
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

function CertificateListItem({ certificate, onClick }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(51, 65, 85, 0.5)" }}
      className="bg-slate-700 rounded-lg border border-slate-600 p-4 flex items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="h-16 w-16 rounded-lg mr-4 flex-shrink-0 relative overflow-hidden">
        <img
          src={certificate.image || "/placeholder.svg"}
          alt={certificate.title}
          className="w-full h-full object-cover"
        />
        {certificate.verified && (
          <div className="absolute bottom-0 right-0 bg-green-500/80 rounded-tl-lg p-0.5">
            <Shield className="h-3 w-3 text-white" />
          </div>
        )}
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center">
          <h3 className="font-bold text-white">{certificate.title}</h3>
          {certificate.featured && (
            <span className="ml-2 bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center">
              <Star className="h-2 w-2 mr-0.5" />
              Featured
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400">Issued by {certificate.issuer}</p>
        <div className="flex items-center mt-1 text-xs text-slate-500">
          <span>ID: {certificate.id}</span>
          <span className="mx-2">•</span>
          <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span
            className={`px-2 py-0.5 rounded-full ${
              certificate.status === "active" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
            }`}
          >
            {certificate.status === "active" ? "Active" : "Expired"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <button
          className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded-lg transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            // Handle download
          }}
          title="Download"
        >
          <Download className="h-4 w-4" />
        </button>
        <button
          className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded-lg transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            // Handle share
          }}
          title="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

function CertificateDetails({ certificate, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
        >
          <ChevronDown className="h-4 w-4 mr-2 rotate-90" />
          Back to Wallet
        </button>
        <div className="flex space-x-2">
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-bold">Certificate Details</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <img
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.title}
                    className="w-full h-auto"
                  />
                  {certificate.verified && (
                    <div className="absolute top-2 right-2 bg-green-500/80 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Blockchain Verified
                    </div>
                  )}
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Verification</h3>
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-green-600/20 flex items-center justify-center mr-3"></div>
                    <div>
                      <p className="text-sm font-medium">Blockchain Verified</p>
                      <p className="text-xs text-slate-400">Ethereum Mainnet</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 bg-slate-800 p-2 rounded font-mono break-all">
                    TX: 0x7c5ea36b4b5c4a78d6c1f3e9{certificate.id.substring(5, 13).toLowerCase()}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h1 className="text-2xl font-bold mb-2">{certificate.title}</h1>
                <p className="text-slate-400 mb-4">Issued by {certificate.issuer}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-slate-400">Certificate ID</p>
                    <p className="font-mono">{certificate.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Credential Type</p>
                    <p>{certificate.credentialType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Issue Date</p>
                    <p>{new Date(certificate.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Expiry Date</p>
                    <p>{new Date(certificate.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Status</p>
                    <p className={certificate.status === "active" ? "text-green-400" : "text-red-400"}>
                      {certificate.status === "active" ? "Active" : "Expired"}
                    </p>
                  </div>
                </div>

                <h3 className="font-medium mb-2">Skills & Competencies</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {certificate.skills.map((skill, index) => (
                    <span key={index} className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-slate-400 mb-6">
                  This certificate verifies the successful completion of the {certificate.title} program, demonstrating
                  proficiency in {certificate.skills.join(", ")}.
                </p>

                <div className="flex space-x-3">
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Original
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Verify on Blockchain
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-bold">Issuer Information</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-slate-700 flex items-center justify-center mr-4">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt={certificate.issuer}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">{certificate.issuer}</h3>
                <p className="text-sm text-slate-400">Verified Issuer</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 mb-4">
              {certificate.issuer} is a recognized educational institution specializing in blockchain and cryptocurrency
              education.
            </p>

            <div className="bg-slate-700 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-2">Contact Information</h3>
              <p className="text-sm">support@{certificate.issuer.toLowerCase().replace(/\s+/g, "")}.com</p>
              <p className="text-sm">www.{certificate.issuer.toLowerCase().replace(/\s+/g, "")}.com</p>
            </div>

            <h3 className="font-medium mb-2">Related Courses</h3>
            <div className="space-y-3">
              <div className="bg-slate-700 rounded-lg p-3 flex items-center">
                <div className="h-10 w-10 rounded-lg bg-slate-600 mr-3"></div>
                <div>
                  <p className="text-sm font-medium">Advanced {certificate.title}</p>
                  <p className="text-xs text-slate-400">Next level course</p>
                </div>
              </div>
              <div className="bg-slate-700 rounded-lg p-3 flex items-center">
                <div className="h-10 w-10 rounded-lg bg-slate-600 mr-3"></div>
                <div>
                  <p className="text-sm font-medium">{certificate.skills[0]} Masterclass</p>
                  <p className="text-xs text-slate-400">Specialized training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

