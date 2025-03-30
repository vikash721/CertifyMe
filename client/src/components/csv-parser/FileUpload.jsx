import React from "react"
import { motion } from "framer-motion"
import { Upload, X, FileText, AlertCircle, Download, ArrowRight } from "lucide-react"
import { saveAs } from 'file-saver'

export default function FileUpload({
  fileName,
  isLoading,
  error,
  handleDragOver,
  handleDrop,
  handleFileUpload,
  fileInputRef,
  clearData,
  proceedToStep2,
  csvData,
}) {
  const downloadTemplate = () => {
    const csvTemplate = [
      ["Recipient Name", "Recipient Email", "Achievement Title", "Issue Date", "Issued By", "Details"],
      ["Alice Johnson", "alice@example.com", "Best Innovator", "2025-03-25", "certifyMe", "Some random details"],
      ["Bob Smith", "bob@example.com", "Top Performer", "2025-03-24", "certifyMe", "Some random details"]
    ]
    const csvContent = "data:text/csv;charset=utf-8," + csvTemplate.map(e => e.join(",")).join("\n")
    const encodedUri = encodeURI(csvContent)
    saveAs(encodedUri, "csv_template.csv")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800 rounded-xl border border-slate-700 p-6"
    >
      <div className="flex items-center justify-between mb-6 text-white">
        <h2 className="text-lg font-bold">Upload CSV File</h2>
        {fileName && (
          <button
            onClick={clearData}
            className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center"
          >
            <X className="h-4 w-4 mr-1.5" />
            Clear
          </button>
        )}
      </div>

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed border-slate-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors text-white ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
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
            Required fields: Recipient Name, Recipient Email, Achievement Title, Issue Date, Issued By, Details
          </p>
        </motion.div>
      </div>

      {/* File Name Display */}
      {fileName && !isLoading && !error && (
        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg flex justify-between items-center">
          <div className="flex items-center text-white">
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
            whileTap={{ scale: 1 }}
            onClick={proceedToStep2}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center "
          >
            Review Data <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      )}

      {/* Sample Template Download */}
      <div className="mt-8 pt-6 border-t border-slate-700 text-white">
        <h3 className="text-sm font-medium mb-3">Need a template?</h3>
        <p className="text-xs text-slate-400 mb-3">
          Download our CSV template to ensure your data is formatted correctly
        </p>
        <button 
          onClick={downloadTemplate}
          className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Download CSV Template
        </button>
      </div>
    </motion.div>
  )
}