"use client"

import React from "react"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"
import { FiCheck } from "react-icons/fi"

export default function TemplateSelector({ templates, selectedTemplate, setSelectedTemplate, setFormType }) {
  const handleCsvUploadClick = () => {
    setFormType("batch")
  }

  return (
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
              <div className={`h-24 bg-gradient-to-r from-${template.color}-900 to-${template.color}-700`}>
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

        <div className="mt-6 pt-6 border-t border-slate-700">
          <h3 className="text-sm font-medium mb-3">Batch Generation</h3>
          <p className="text-xs text-slate-400 mb-3">
            Upload a CSV file to generate multiple certificates at once
          </p>
          <button
            className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            onClick={handleCsvUploadClick}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV File
          </button>
          <a href="#" className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block">
            Download CSV Template
          </a>
        </div>
      </div>
    </motion.div>
  )
}