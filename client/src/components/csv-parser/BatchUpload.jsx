"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import Papa from "papaparse"
import FileUpload from "./FileUpload"
import DataTable from "./DataTable"
import Deployment from "./Deployment"
import useBatchStore from "../../store/useBatchStore"

export default function BatchUpload() {
  const [step, setStep] = useState(1)
  const fileInputRef = useRef(null)

  // Zustand store
  const {
    csvData,
    fileName,
    isLoading,
    error,
    searchTerm,
    sortConfig,
    selectedRows,
    isDeploying,
    deploymentSuccess,
    setCsvData,
    setFileName,
    setIsLoading,
    setError,
    setSearchTerm,
    setSortConfig,
    setSelectedRows,
    setIsDeploying,
    setDeploymentSuccess,
    clearData,
  } = useBatchStore()

  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase()
      setFilteredData(
        csvData.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(lowercasedSearchTerm)
          )
        )
      )
    } else {
      setFilteredData(csvData)
    }
  }, [searchTerm, csvData])

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
        const requiredFields = ["Recipient Name", "Recipient Email", "Achievement Title", "Issue Date", "Issued By", "Details"]
        const headers = results.meta.fields || []

        const missingFields = requiredFields.filter((field) => !headers.includes(field))

        if (missingFields.length > 0) {
          setError(`CSV is missing required fields: ${missingFields.join(", ")}`)
          setIsLoading(false)
          return
        }

        const dataWithIds = results.data.map((row, index) => ({
          ...row,
          "Certificate ID": row["Certificate ID"] || generateCertificateId(),
          id: index,
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

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedRows.length === csvData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(csvData.map((row) => row.id))
    }
  }

  const handleDeleteSelected = () => {
    setCsvData(csvData.filter((row) => !selectedRows.includes(row.id)))
    setSelectedRows([])
  }

  const handleDeployToBlockchain = () => {
    setIsDeploying(true)

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

  const proceedToStep3 = () => {
    setStep(3)
  }

  const goBackToStep1 = () => {
    setStep(1)
  }

  const goBackToStep2 = () => {
    setStep(2)
  }

  const handleClearData = () => {
    clearData()
    setStep(1)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center mb-8">
        <div className={`flex items-center justify-center h-10 w-10 rounded-full ${step >= 1 ? "bg-blue-600 text-white" : "bg-blue-600/20 text-blue-400"} font-bold`}>1</div>
        <div className={`h-1 w-20 ${step > 1 ? "bg-blue-600" : "bg-slate-700"}`}></div>

        <div className={`flex items-center justify-center h-10 w-10 rounded-full ${step >= 2 ? "bg-blue-600 text-white" : "bg-blue-600/20 text-blue-400"} font-bold`}>2</div>
        <div className={`h-1 w-20 ${step > 2 ? "bg-blue-600" : "bg-slate-700"}`}></div>

        <div className={`flex items-center justify-center h-10 w-10 rounded-full ${step >= 3 ? "bg-blue-600 text-white" : "bg-blue-600/20 text-blue-400"} font-bold`}>3</div>
      </div>

      {step === 1 ? (
        <FileUpload
          fileName={fileName}
          isLoading={isLoading}
          error={error}
          handleFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
          clearData={handleClearData} // Use the updated handleClearData
          proceedToStep2={proceedToStep2}
          csvData={csvData}
        />
      ) : step === 2 ? (
        <DataTable
          csvData={csvData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          handleRowSelect={handleRowSelect}
          handleSelectAll={handleSelectAll}
          selectedRows={selectedRows}
          handleDeleteSelected={handleDeleteSelected}
          goBackToStep1={goBackToStep1}
          proceedToStep3={proceedToStep3}
          filteredData={filteredData} // Pass the filtered data here
        />
      ) : (
        <Deployment
          handleDeployToBlockchain={handleDeployToBlockchain}
          isDeploying={isDeploying}
          deploymentSuccess={deploymentSuccess}
          clearData={handleClearData} // Use the updated handleClearData
          csvData={csvData} // Ensure csvData is passed here
          goBackToStep2={goBackToStep2}
        />
      )}
    </div>
  )
}