"use client"

import React, { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import Papa from "papaparse"
import { ArrowRight, ChevronDown } from "lucide-react"
import FileUpload from "./FileUpload"
import DataTable from "./DataTable"
import Deployment from "./Deployment"

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
    <div className="p-6 space-y-6">
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
        <FileUpload
          fileName={fileName}
          isLoading={isLoading}
          error={error}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
          clearData={clearData}
          proceedToStep2={proceedToStep2}
          csvData={csvData}
        />
      ) : (
        <div className="space-y-6">
          <DataTable
            sortedData={sortedData}
            filteredData={filteredData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            requestSort={requestSort}
            sortConfig={sortConfig}
            handleRowSelect={handleRowSelect}
            handleSelectAll={handleSelectAll}
            selectedRows={selectedRows}
            handleDeleteSelected={handleDeleteSelected}
            exportToCSV={exportToCSV}
            goBackToStep1={goBackToStep1}
            csvData={csvData}
          />
          <Deployment
            handleDeployToBlockchain={handleDeployToBlockchain}
            isDeploying={isDeploying}
            deploymentSuccess={deploymentSuccess}
            clearData={clearData}
            csvData={csvData}
          />
        </div>
      )}
    </div>
  )
}