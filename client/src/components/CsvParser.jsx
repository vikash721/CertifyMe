"use client"

import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import Papa from "papaparse"
import {
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  FileText,
  Filter,
  Loader,
  Plus,
  Search,
  Shield,
  Trash,
  Upload,
  X,
} from "lucide-react"
import { FiCheck } from "react-icons/fi"


export default function BatchUpload() {
  const [step, setStep] = useState(1)
  const [csvData, setCsvData] = useState([])
  const [fileName, setFileName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [selectedRows, setSelectedRows] = useState([])
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentSuccess, setDeploymentSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name)
    setIsLoading(true)
    setError("")

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Validate required fields
        const requiredFields = ["Recipient Name", "Recipient Email", "Achievement Title", "Issue Date"]
        const headers = results.meta.fields || []

        const missingFields = requiredFields.filter((field) => !headers.includes(field))

        if (missingFields.length > 0) {
          setError(`CSV is missing required fields: ${missingFields.join(", ")}`)
          setIsLoading(false)
          return
        }

        // Add Certificate ID to each row
        const dataWithIds = results.data.map((row, index) => ({
          ...row,
          "Certificate ID": row["Certificate ID"] || generateCertificateId(),
          id: index, // Add unique id for row selection
        }))

        setCsvData(dataWithIds)
        setIsLoading(false)
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`)
        setIsLoading(false)
      },
    })
  }, [])

  const generateCertificateId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let id = ""
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `CERT-${id}`
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileInput = fileInputRef.current
      fileInput.files = e.dataTransfer.files
      handleFileUpload({ target: fileInput })
    }
  }

  const clearData = () => {
    setCsvData([])
    setFileName("")
    setError("")
    setStep(1)
    setSelectedRows([])
    setDeploymentSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const exportToCSV = () => {
    if (csvData.length === 0) return

    const dataToExport = csvData.map(({ id, ...rest }) => rest) // Remove the internal id field
    const csv = Papa.unparse(dataToExport)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${fileName.split(".")[0]}_with_ids.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...csvData].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  const filteredData = sortedData.filter((row) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      (row["Recipient Name"] && row["Recipient Name"].toLowerCase().includes(searchLower)) ||
      (row["Recipient Email"] && row["Recipient Email"].toLowerCase().includes(searchLower)) ||
      (row["Achievement Title"] && row["Achievement Title"].toLowerCase().includes(searchLower)) ||
      (row["Certificate ID"] && row["Certificate ID"].toLowerCase().includes(searchLower))
    )
  })

  const handleRowSelect = (id) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map((row) => row.id))
    }
  }

  const handleDeleteSelected = () => {
    setCsvData((prev) => prev.filter((row) => !selectedRows.includes(row.id)))
    setSelectedRows([])
  }

  const handleDeployToBlockchain = () => {
    setIsDeploying(true)

    // Simulate blockchain deployment
    setTimeout(() => {
      setIsDeploying(false)
      setDeploymentSuccess(true)
    }, 3000)
  }

  const proceedToStep2 = () => {
    if (csvData.length > 0) {
      setStep(2)
    }
  }

  const goBackToStep1 = () => {
    setStep(1)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Batch Certificate Generation</h1>
        <p className="text-slate-400">Upload a CSV file to generate multiple certificates at once</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center mb-8">
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full ${step === 1 ? "bg-blue-600" : "bg-blue-600/20 text-blue-400"} text-white font-bold`}
        >
          1
        </div>
        <div className={`h-1 w-20 ${step === 1 ? "bg-slate-700" : "bg-blue-600"}`}></div>
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full ${step === 2 ? "bg-blue-600" : "bg-slate-700"} text-white font-bold`}
        >
          2
        </div>
      </div>

      {step === 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Upload CSV File</h2>
            {fileName && (
              <button
                onClick={clearData}
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center"
              >
                <X className="h-4 w-4 mr-1.5" />
                Clear
              </button>
            )}
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed border-slate-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !isLoading && fileInputRef.current.click()}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="hidden" />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Upload className="mx-auto h-12 w-12 text-slate-500 mb-4" />
              <p className="text-lg mb-2">Drag and drop your CSV file here</p>
              <p className="text-sm text-slate-400 mb-4">or click to browse</p>
              <p className="text-xs text-slate-500">
                Required fields: Recipient Name, Recipient Email, Achievement Title, Issue Date
              </p>
            </motion.div>
          </div>

          {/* File Name Display */}
          {fileName && !isLoading && !error && (
            <div className="mt-4 p-3 bg-slate-700/50 rounded-lg flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-sm font-medium">{fileName}</span>
              </div>
              <span className="text-sm text-slate-400">{csvData.length} records</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-700 text-red-400 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="mt-6 flex flex-col items-center justify-center">
              <div className="relative h-12 w-12 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-transparent animate-spin"></div>
              </div>
              <p className="text-slate-400">Processing CSV file...</p>
            </div>
          )}

          {/* Next Step Button */}
          {csvData.length > 0 && !isLoading && (
            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={proceedToStep2}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center"
              >
                Review Data <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
          )}

          {/* Sample Template Download */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <h3 className="text-sm font-medium mb-3">Need a template?</h3>
            <p className="text-xs text-slate-400 mb-3">
              Download our CSV template to ensure your data is formatted correctly
            </p>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download CSV Template
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Table Controls */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center">
                <button
                  onClick={goBackToStep1}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center mr-4"
                >
                  <ChevronDown className="h-4 w-4 mr-1.5 rotate-90" />
                  Back
                </button>
                <h2 className="text-lg font-bold">Review Certificate Data</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleDeleteSelected}
                    disabled={selectedRows.length === 0}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${selectedRows.length === 0 ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-red-600/20 text-red-400 hover:bg-red-600/30"}`}
                  >
                    <Trash className="h-4 w-4 mr-1.5" />
                    Delete
                  </button>

                  <button
                    onClick={exportToCSV}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1.5" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Data Summary */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-slate-700/50 rounded-lg px-4 py-2 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-400" />
                <div>
                  <p className="text-xs text-slate-400">Total Records</p>
                  <p className="font-medium">{csvData.length}</p>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg px-4 py-2 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-purple-400" />
                <div>
                  <p className="text-xs text-slate-400">Filtered Records</p>
                  <p className="font-medium">{filteredData.length}</p>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg px-4 py-2 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-400" />
                <div>
                  <p className="text-xs text-slate-400">Selected Records</p>
                  <p className="font-medium">{selectedRows.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                    <th className="p-4 font-medium">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                          onChange={handleSelectAll}
                          className="h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-800"
                        />
                      </div>
                    </th>
                    <th className="p-4 font-medium">
                      <button className="flex items-center" onClick={() => requestSort("Certificate ID")}>
                        Certificate ID
                        {sortConfig.key === "Certificate ID" &&
                          (sortConfig.direction === "ascending" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </button>
                    </th>
                    <th className="p-4 font-medium">
                      <button className="flex items-center" onClick={() => requestSort("Recipient Name")}>
                        Recipient Name
                        {sortConfig.key === "Recipient Name" &&
                          (sortConfig.direction === "ascending" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </button>
                    </th>
                    <th className="p-4 font-medium">
                      <button className="flex items-center" onClick={() => requestSort("Recipient Email")}>
                        Recipient Email
                        {sortConfig.key === "Recipient Email" &&
                          (sortConfig.direction === "ascending" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </button>
                    </th>
                    <th className="p-4 font-medium">
                      <button className="flex items-center" onClick={() => requestSort("Achievement Title")}>
                        Achievement Title
                        {sortConfig.key === "Achievement Title" &&
                          (sortConfig.direction === "ascending" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </button>
                    </th>
                    <th className="p-4 font-medium">
                      <button className="flex items-center" onClick={() => requestSort("Issue Date")}>
                        Issue Date
                        {sortConfig.key === "Issue Date" &&
                          (sortConfig.direction === "ascending" ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          ))}
                      </button>
                    </th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className={`border-t border-slate-700 ${selectedRows.includes(row.id) ? "bg-blue-900/10" : ""}`}
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => handleRowSelect(row.id)}
                            className="h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-800"
                          />
                        </td>
                        <td className="p-4 font-mono text-sm">{row["Certificate ID"]}</td>
                        <td className="p-4">{row["Recipient Name"]}</td>
                        <td className="p-4 text-slate-300">{row["Recipient Email"]}</td>
                        <td className="p-4">{row["Achievement Title"]}</td>
                        <td className="p-4 text-slate-300">{row["Issue Date"]}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-slate-400 hover:text-white transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-slate-400 hover:text-white transition-colors">
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No records found. Try adjusting your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deploy to Blockchain */}
          <motion.div
            className="bg-slate-800 rounded-xl border border-slate-700 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {deploymentSuccess ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600/20 text-green-400 mb-4">
                  <FiCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Certificates Successfully Deployed!</h3>
                <p className="text-slate-400 mb-6">All certificates have been successfully issued on the blockchain</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={clearData}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Batch
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    View All Certificates
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 rounded-lg bg-blue-600/20 flex items-center justify-center mr-4">
                   
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Deploy to Blockchain</h3>
                    <p className="text-sm text-slate-400">
                      Issue all certificates on the blockchain for permanent verification
                    </p>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="bg-blue-600/20 rounded-full p-1 mr-3 mt-0.5">
                      <FiCheck className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Ready to Deploy</p>
                      <p className="text-sm text-slate-400">
                        {csvData.length} certificates will be issued on the blockchain. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleDeployToBlockchain}
                    disabled={isDeploying || csvData.length === 0}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center ${
                      isDeploying || csvData.length === 0
                        ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isDeploying ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Deploy to Blockchain
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

